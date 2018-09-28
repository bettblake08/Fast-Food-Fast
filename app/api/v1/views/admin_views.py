from flask import make_response, jsonify
from flask_restful import reqparse
from app.database.models import OrderModel, OrderItemModel


class AdminViews():
    """ This class stores all the routes accessible only to an administrator """

    @classmethod
    def get_order(cls, orderId):
        """ Fetch order data endpoint

        Arguments:
            - orderId (int): this is the order id of the order to fetch

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

        try:
            orderId = int(orderId)
        except:
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

        return make_response(jsonify({
            'error': 0,
            "content": order.json()
        }), 200)

    @classmethod
    def update_order(cls, orderId):
        """ Update order status endpoint

        Arguments:
            - orderId (int):  An order id
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

        try:
            orderId = int(orderId)
        except:
            return make_response(jsonify(
                {
                    'error_msg': "Invalid order id . Please provide a valid status number"
                }
            ), 400)

        if data.status not in [0, 1, 2, 3]:
            return make_response(jsonify(
                {
                    'error': 1,
                    'error_msg': "Invalid status number. Please provide a valid status number"
                }
            ), 200)

        order = OrderModel.get(orderId)

        if not order:
            return make_response(jsonify(
                {
                    'error': 2,
                    'error_msg': "Order not found. Please provide a valid order id"
                }
            ), 200)

        order.status = data.status
        order.update()

        return make_response(
            jsonify({
                'error': 0
            }), 200)

    @classmethod
    def get_all_orders(cls):
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

        return make_response(jsonify(
            {
                'error': 0,
                "content": [order.json() for order in orders]
            }
        ), 200)

    @classmethod
    def post_new_order_item(cls):
        """ Post a new menu item endpoint

        Arguments:
            - name (str) : The name of the order item
            - price (int) : The price of the order 
            - c_id (int) : The category id of the order

        Category Id
            - Breakfast
            - Main
            - Snacks
            - Drinks
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
                }), 200
            )

        except:
            return make_response(
                jsonify({
                    'error_msg': "Failed to process new order item. Please try again!"
                }), 400
            )
