from flask import make_response, jsonify
from flask_restful import reqparse
from app.database.models import OrderModel, OrderItemModel
from flask_jwt_extended import get_raw_jwt


class AdminViews():
    """ This class stores all the routes accessible only to an administrator """

    @classmethod
    def get_order(cls, order_id):
        """ Fetch order data endpoint

        Arguments:
            - order_id (int): this is the order id of the order to fetch

        Returns:
            - If orders are present
                - A response with a status code 200
                - A success message

            - If orders are not present
                - A response with a status code 404
                - An error msg in response

        """

        try:
            order_id = int(order_id)
        except:
            return make_response(
                jsonify({
                    "message":"Invalid order id. Please input a valid id."
                }), 400
            )

        order = {}
        order = OrderModel.get(order_id)

        if not bool(order):
            return make_response(jsonify(
                {
                    "message": "Order does not exist. Please enter an existing order id."
                }), 404
            )

        return make_response(jsonify({
            'message': "Fetch order successful!",
            "content": order.json()
        }), 200)


    @classmethod
    def update_order(cls, order_id):
        """ Update order status endpoint

        Arguments:
            - order_id (int):  An order id
            - status (int) : A status number used as a representation of the order status

        Returns:
            - If status argument is not present and of valid type
                - A response with a status code 400
                - An message in response

            - If status argument is incorrect
                - A response with a status code 400
                - An error msg in response

            - If order not found
                - A response with a status code 404
                - An error msg in response

            - If update succeeded
                - A response with a status code 200
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
            order_id = int(order_id)
        except:
            return make_response(jsonify(
                {
                    'message': "Invalid order id . Please provide a valid status number."
                }
            ), 400)

        if data.status not in [0, 1, 2, 3]:
            return make_response(jsonify(
                {
                    'message': "Invalid status number. Please provide a valid status number."
                }
            ), 400)

        order = OrderModel.get(order_id)

        if not order:
            return make_response(jsonify(
                {
                    'message': "Order not found. Please provide a valid order id."
                }
            ), 404)

        order.status = data.status
        order.update()

        return make_response(
            jsonify({
                'message': "You have successfully updated the status of the order."
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
                "message":"You have successfully retrieved all the present orders!",
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

        if data.c_id not in [0, 1, 2, 3]:
            return make_response(jsonify(
                {
                    'message': "Invalid category id. Please provide a valid category number."
                }
            ), 400)

        item = OrderItemModel(
            name=data.name,
            price=data.price * 100,
            c_id=data.c_id)

        try:
            item.save()

            return make_response(
                jsonify({
                    'message':"You have successfully created a new order!"
                }), 201
            )

        except:
            return make_response(
                jsonify({
                    'message': "Failed to process new order item. Please try again!"
                }), 400
            )
