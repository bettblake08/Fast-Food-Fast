from flask import make_response, jsonify

from app.database.models import OrderItemModel, UserModel
from flask_restful import reqparse
from app.managers.serialization import Serialization,flask_bcrypt


class MainViews():
    """ This class stores all the routes accessible to all users"""

    @classmethod
    def sign_up(cls):
        parser = reqparse.RequestParser()

        parser.add_argument(
            'username',
            required=True,
            help="The username field is required"
        )

        parser.add_argument(
            'email',
            required=True,
            help="The email field is required"
        )

        parser.add_argument(
            'password',
            required=True,
            help="The password field is required"
        )

        parser.add_argument(
            'role',
            type=int,
            required=True,
            help="The role field is required"
        )

        data = parser.parse_args()

        if data['role'] not in [1, 2]:

            return make_response(
                jsonify({
                        "message": "Incorrect role id. Please input correct role id."
                        }), 400
            )

        if not Serialization.test_email(data.email):
            return make_response(
                jsonify(
                    {
                        "message": "Incorrect email. Please input a valid email string."
                    }), 400
            )

        if not Serialization.test_password(data.password, 1):
            return make_response(
                jsonify(
                    {
                        "message": "Incorrect password. Please input a valid password string."
                    }), 400
            )

        if UserModel.find_user_by_username(data.username):
            return make_response(
                jsonify(
                    {
                        "message": "User already exists. Please use another username."
                    }
                ), 403
            )

        elif UserModel.find_user_by_email(data.email):
            return make_response(
                jsonify(
                    {
                        "message": "User already exists. Please use another email address."
                    }
                ), 403
            )

        user = UserModel(
            username=data.username,
            email=data.email,
            password=flask_bcrypt.generate_password_hash(data['password']),
            role=data.role)

        try:
            user.save()

            return make_response(
                jsonify({
                        "message": "Sign up successful. User has been created!"
                        }), 201
            )
        except:
            return make_response(
                jsonify({
                        "message": "Failed to add user. Please try again later"
                        }), 500
            )


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
                        "message": "Menu has not been populated.",
                        "content":[]
                        }), 200
            )

        return make_response(jsonify(
            {
                'message': "Successfully fetched menu!",
                "content": [item.json() for item in items]
            }), 200)
