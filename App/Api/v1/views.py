
from functools import wraps

from flask import Blueprint,redirect,url_for,jsonify,make_response,json
from flask_restful import Api,reqparse
from flask_jwt_extended import JWTManager,get_jwt_claims,verify_fresh_jwt_in_request,get_jwt_identity

from App.Database.Models import UserModel,RevokedTokenModel,OrderModel,OrderedItemModel,OrderItemModel

from App.Api.v1.Controllers import LoginController


api_v1 = Blueprint('api', __name__)
lc = LoginController()

api = Api(api_v1)

jwt = JWTManager()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_token_blacklisted(jti)

""" 
@jwt.unauthorized_loader
@jwt.invalid_token_loader
@jwt.expired_token_loader
def redirect_to_login(e):
    pass 
    
"""

def user_required(roleId):
    def user_identify(fn):
        @wraps(fn)
        def wrapper(*args, **param):
            verify_fresh_jwt_in_request()

            claims = get_jwt_claims()

            if claims['role'] != roleId:
                role = ""
                if param['role'] == 1:
                    role = "customer"
                elif param['role'] == 2:
                    role = "admin"

                return jsonify({
                    "error_msg":'Only {} users have permission to access!'.format(role)
                }), 403
            else:
                return fn(*args, **param)
        
        return wrapper
    return user_identify


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    if identity['role'] == 1:
        return {'role': 1}
    else:
        return {'role': 2}


@api_v1.route('/auth/signup', methods=['POST'])
def user_sign_up():
    return lc.signUp()


@api_v1.route('/auth/login', methods=['POST'])
def user_login_in():
    return lc.loginAuth()


@api_v1.route("/order/<string:param>")
@user_required(2)
def get_order(param):
    """ Fetch order data endpoint

        Arguments:
            - param (int): this is the order id of the order to fetch

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content field in response body with order data
                - An error number 0 in response body

            - If orders are not present
                - A response with a status code 200
                - An error number 1 in response body
                - An error msg in response

    """
    
    try :
        orderId = int(param)
    except  :
        return make_response(
            jsonify({}), 400
        )

    order = {}

    order = OrderModel.get(orderId)

    if not bool(order):
        return make_response(jsonify(
            {
                'error': 1,
                "error_msg": "Order does not exist. Please enter a valid order id."
            }), 200
        )

    return make_response(jsonify(
        {
            'error': 0,
            "content": order.json()
        }),200)


@api_v1.route("/order/<string:param>", methods=['PUT'])
@user_required(2)
def update_order(param):
    """ Update order status endpoint

        Arguments:
            - param (int):  An order id
            - status (int) : A status number used as a representation of the order status

        Returns:
            - If status argument is not present and of valid type
                - A response with a status code 400
                - An error_msg stating "Status field required. Please provide a new status for the order."

            - If status argument is incorrect
                - A response with a status code 200
                - An error number 1 in response body
                - An error msg in response

            - If order not found
                - A response with a status code 200
                - An error number 2 in response body
                - An error msg in response

            - If update succeeded
                - If status argument is incorrect
                - A response with a status code 200
                - An error number 0 in response body

        """

    parser = reqparse.RequestParser()

    parser.add_argument(
         'status',
          type=int,
          required=True,
          help="Status field required. Please provide a new status for the order."
         )

    data = parser.parse_args()

    orderId = param

    if data.status not in [0, 1, 2, 3]:
        return {
            'error': 1,
            'error_msg': "Invalid status number. Please provide a valid status number"
        }, 200

    order = OrderModel.get(orderId)

    if not order:
        return {
            'error': 2,
            'error_msg': "Order not found. Please provide a valid order id"
        }, 200

    order.status = data.status
    order.update()

    return {
        'error': 0
    }, 200


@api_v1.route('/orders')
@user_required(2)
def get_all_orders():
    """ Fetch all orders endpoint

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content list with all orders

            - If orders are not present
                - A response with a status code 200
                - An empty content list
        
    """

    orders = OrderModel.get_all_orders()

    return {
        'error': 0,
        "content": [x.json() for x in orders]
    }, 200


@api_v1.route("/users/orders", methods=['POST'])
@user_required(1)
def post_new_order():
    """ Place an order endpoint

        Arguments:
            - items (list) : A list of objects each containing a item id (int) and quantity(int)

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content list with all orders

            - If orders are not present
                - A response with a status code 200
                - An empty content list

    """


    parser = reqparse.RequestParser()

    parser.add_argument("items",
                        required=True,
                        help="The item list is required")

    data = parser.parse_args()

    user = get_jwt_identity()

    total = 0
    orderItems = []

    try:
        for orderedItem in json.loads(data['items']):

            if not OrderItemModel.get(orderedItem['id']):
                return make_response(jsonify(
                    {
                        'error': 1,
                        'error_msg': "Item " + str(orderedItem['id']) + " doesn't exist!"
                    }
                ), 200)

    except:
        return make_response(
            jsonify(
                {
                    'error': 2,
                    'error_msg': "Items list is invalid. Please check to see all items id and quantity properties."
                }
            ), 200
        )

    order = OrderModel(
        userId=user['id'],
        items=orderItems,
        total=total,
        status=0)

    order.save()

    return make_response(
        jsonify({
                'error': 0
            }
        ), 200
    )


@api_v1.route('/menu')
def get_all_menu_items():
    """ Fetch menu items endpoint

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content list with all orders

            - If orders are not present
                - A response with a status code 200
                - An empty content list

    """
    items = OrderItemModel.get_all_items()

    if not bool(items):
        return make_response(
            jsonify(
                {
                    'error': 1,
                    "error_msg": "Order does not exist. Please enter a valid order id."
                }
            ), 200
        )

    return make_response(jsonify(
        {
            'error': 0,
            "content": [x.json() for x in items]
        }
    ), 200)


@api_v1.route("/menu", methods=['POST'])
def post_new_order_item():
    """ Post a new menu item endpoint

        Arguments:
            - name (str) : The name of the order item
            - price (int) : The price of the order 
            - c_id (int) : The category id of the order

        """

    parser = reqparse.RequestParser()

    parser.add_argument(
        'name',
        required=True,
        help="Name field required. Please provide a name for the item."
        )

    parser.add_argument(
        'price',
        type=float,
        required=True,
        help="Price field required. Please provide a price for the item as an integer."
        )

    parser.add_argument(
        'c_id',
        type=int,
        required=True,
        help="c_id (Category Id) field required. Please provide a valid category id of integer type."
        )

    data = parser.parse_args()

    if int(data.c_id) not in [0, 1, 2, 3]:
        return make_response(jsonify(
            {
                'error': 1,
                'error_msg': "Invalid status number. Please provide a valid status number"
            }
        ), 200)

    item = OrderItemModel(
        name=data.name,
        price=data.price * 100,
        c_id=data.c_id)

    try:
        item.save()

        return make_response(
            jsonify({
                'error': 0
            }
        ), 200)

    except:
        return make_response(
            jsonify({
                'error_msg': "Failed to process new order item. Please try again!"
            }
        ), 400)
