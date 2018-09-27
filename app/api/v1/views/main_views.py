from flask import make_response, jsonify

from app.database.models import OrderItemModel

class MainViews():
    """ This class stores all the routes accessible to all users"""

    def get_menu(self):
        """ Fetch menu items endpoint

        Returns:
            - If menu is populated
                - A response with a status code 200
                - A error value in response body is 0

            - If menu is not populated
                - A response with a status code 200
                - A error value in response body is 1

        """

        items = OrderItemModel.get_all_items()

        if not bool(items):
            return make_response(
                jsonify({
                        'error': 1,
                        "error_msg": "Menu has not been populated."
                    }), 200
            )

        return make_response(jsonify(
            {
                'error': 0,
                "content": [item.json() for item in items]
            }), 200)
