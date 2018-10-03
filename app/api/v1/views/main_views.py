from flask import make_response, jsonify

from app.database.models import OrderItemModel


class MainViews():
    """ This class stores all the routes accessible to all users"""

    def get_menu(self):
        """ Fetch menu items endpoint

        Returns:
            - If menu is populated
                - A response with a status code 200

            - If menu is not populated
                - A response with a status code 404
        """

        items = OrderItemModel.get_all_items()

        if not bool(items):
            return make_response(
                jsonify({
                        "error_msg": "Menu has not been populated."
                        }), 404
            )

        return make_response(jsonify(
            {
                'message': "Successfully fetched menu.",
                "content": [item.json() for item in items]
            }), 200)
