
import json

from flask import make_response, jsonify
from flask_restful import reqparse
from flask_jwt_extended import get_jwt_identity

from app.database.models import OrderItemModel, OrderModel


class UserViews():
    """ This class stores all the routes accessible only to a customer user """

    def post_a_new_order(self):
        """ Place an order endpoint

        Arguments:
            - items (list) : A list of objects each containing a item id (int) and quantity(int)

        Returns:
            - If items are all valid
                - A response with a status code 200
                - A success message is returned

            - If items do not all exist
                - A response with a status code 404
                - An error message is returned

            - If items are not all valid
                - A response with a status code 400
                - An error message is returned
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
                            'error_msg': "Item " + str(ordered_items['id']) + " doesn't exist!"
                        }
                    ), 404)
                else:

                    if 'quantity' not in ordered_items:
                        return make_response(jsonify(
                            {
                                'error_msg': "Item " + str(ordered_items['id']) + " doesn't have a quantity field!"
                            }
                        ), 400)

                    total += ordered_items['quantity'] * order_item.price

        except:
            return make_response(
                jsonify({
                    'error_msg': "Items list is invalid. Please check to see all items id and quantity properties."
                    }), 400
                )

        order = OrderModel(
            user_id=user['id'],
            items=order_items,
            total=total,
            status=0)

        order.save()

        return make_response(
            jsonify({
                    "message":"You have successfully created a new order"
                }), 201
            )

    def get_user_order_history(self):
        """ Get user order history Endpoint

        Returns:
            - If user is logged in
                - A response with a status code 200
                - A content value as list of orders
                - A success message
        """

        user = get_jwt_identity()

        orders = OrderModel.get_all_orders_by_user(user['id'])

        return make_response(
            jsonify({
                'message':"Successfully fetched user order history",
                'content': [order.json() for order in orders]
                }), 200
            )
