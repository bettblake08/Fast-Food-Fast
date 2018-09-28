
import json

from flask import make_response, jsonify
from flask_restful import reqparse
from flask_jwt_extended import get_jwt_identity

from App.database.models import OrderItemModel, OrderModel


class UserViews():
    """ This class stores all the routes accessible only to a customer user """

    def post_a_new_order(self):
        """ Place an order endpoint

        Arguments:
            - items (list) : A list of objects each containing a item id (int) and quantity(int)

        Returns:
            - If items are all valid
                - A response with a status code 200
                - An error value in response body is 0

            - If items do not all exist
                - A response with a status code 200
                - An error value in response body is 1

            - If items are not all valid
                - A response with a status code 200
                - An error value in response body is 2

        """

        parser = reqparse.RequestParser()

        parser.add_argument("items",
                            required=True,
                            help="The item list is required")

        data = parser.parse_args()

        user = get_jwt_identity()

        total = 0
        order_items = []

        try:
            for ordered_items in json.loads(data['items']):
                order_item = OrderItemModel.get(ordered_items['id'])

                if not order_item:
                    return make_response(jsonify(
                        {
                            'error': 1,
                            'error_msg': "Item " + str(ordered_items['id']) + " doesn't exist!"
                        }
                    ), 200)
                else:

                    if 'quantity' not in ordered_items:
                        return make_response(jsonify(
                            {
                                'error': 2,
                                'error_msg': "Item " + str(ordered_items['id']) + " doesn't have a quantity field!"
                            }
                        ), 200)

                    total += ordered_items['quantity'] * order_item.price

        except:
            return make_response(
                jsonify({
                    'error': 2,
                    'error_msg': "Items list is invalid. Please check to see all items id and quantity properties."
                    }), 200
                )

        order = OrderModel(
            user_id=user['id'],
            items=order_items,
            total=total,
            status=0)

        order.save()

        return make_response(
            jsonify({
                    'error': 0
                    }), 200
        )

    def get_user_order_history(self):
        """ Get user order history Endpoint

        Returns:
            - If user is logged in
                - A response with a status code 200
                - An error value in response body is 0
                - A content value as list of orders
        """

        user = get_jwt_identity()

        orders = OrderModel.get_all_orders_by_user(user['id'])

        return make_response(
            jsonify({
                'error': 0,
                'content': [order.json() for order in orders]
                }), 200
            )
