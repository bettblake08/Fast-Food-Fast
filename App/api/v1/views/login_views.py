from flask import jsonify, make_response
from flask_restful import reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_raw_jwt

from App.managers.serialization import Serialization, flask_bcrypt
from App.database.models import UserModel, RevokedTokenModel


class LoginViews():
    """ This class stores all the routes required for authentication """

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
                        "error_msg": "Incorrect role id. Please input correct role id"
                        }
                        ), 400
            )

        if not Serialization.test_email(data.email):
            return make_response(
                jsonify(
                    {
                        "error": 1,
                        "error_msg": "Incorrect email. Please input a valid email string."
                    }
                ), 200
            )

        if not Serialization.test_password(data.password, 1):
            return make_response(
                jsonify(
                    {
                        "error": 2,
                        "error_msg": "Incorrect password. Please input a valid password string."
                    }
                ), 200
            )

        if UserModel.find_user_by_username(data.username):
            return make_response(
                jsonify(
                    {
                        "error": 3,
                        "error_msg": "user already exists. Please use another username."
                    }
                ), 200
            )

        elif UserModel.find_user_by_email(data.email):
            return make_response(
                jsonify(
                    {
                        "error": 4,
                        "error_msg": "user already exists. Please use another email address."
                    }
                ), 200
            )

        user = UserModel(
            username=data.username,
            email=data.email,
            password=flask_bcrypt.generate_password_hash(data['password']),
            role=data.role)

        user.save()

        try:

            return make_response(
                jsonify({
                        "error": 0
                        }), 200
            )
        except:
            return make_response(
                jsonify({
                        "error_msg": "Failed to add user. Please try again later"
                        }), 400
            )

    @staticmethod
    def login_auth():
        parser = reqparse.RequestParser()
        parser.add_argument('username',
                            required=True,
                            help="The username field is required")

        parser.add_argument('password',
                            required=True,
                            help="The password field is required")

        data = parser.parse_args()

        if not Serialization.test_password(data.password, 1):
            return make_response(jsonify(
                {
                    'error': 1
                }
            ), 200)

        
        current_user = None

        if Serialization.test_email(data.username):
            current_user = UserModel.find_user_by_email(data.username)
        else:
            current_user = UserModel.find_user_by_username(data.username)

        if not current_user:
            return make_response(jsonify(
                {
                    "error": 2,
                    'message': 'User {} doesn\'t exist'.format(data.username)
                }
            ), 200)

       

        if current_user.authenticate(data['password']):
            access_token = create_access_token(
                identity={
                    'id': current_user.id,
                    'role': current_user.role
                }, fresh=True)

            refresh_token = create_refresh_token(
                identity={
                    'id': current_user.id,
                    'role': current_user.role
                })

            resp = jsonify({
                'error': 0,
                'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
            })

            return resp
        else:
            return make_response(jsonify({
                'error': 3,
                'message': 'Wrong credentials'}),
                200)

    @staticmethod
    def log_out():
        jti = get_raw_jwt()['jti']

        try:
            revoked_token = RevokedTokenModel(token=jti)
            revoked_token.insert()

            resp = jsonify({
                "error": 0,
                'error_msg': 'Access token has been revoked'}
            )

            return resp, 200
        except:
            return jsonify({
                "error": 1,
                'error_msg': 'Something went wrong'}
            ), 500
