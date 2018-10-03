from flask import jsonify, make_response
from flask_restful import reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_raw_jwt

from app.managers.serialization import Serialization, flask_bcrypt
from app.database.models import UserModel, RevokedTokenModel


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
                    }), 400
                )

        if not Serialization.test_email(data.email):
            return make_response(
                jsonify(
                    {
                        "error_msg": "Incorrect email. Please input a valid email string."
                    }), 400
                )

        if not Serialization.test_password(data.password, 1):
            return make_response(
                jsonify(
                    {
                        "error_msg": "Incorrect password. Please input a valid password string."
                    }), 400
                )

        if UserModel.find_user_by_username(data.username):
            return make_response(
                jsonify(
                    {
                        "error_msg": "user already exists. Please use another username."
                    }
                ), 403
            )

        elif UserModel.find_user_by_email(data.email):
            return make_response(
                jsonify(
                    {
                        "error_msg": "user already exists. Please use another email address."
                    }
                ), 403
            )

        
        try:    
            user = UserModel(
            username=data.username,
            email=data.email,
            password=flask_bcrypt.generate_password_hash(data['password']),
            role=data.role)

            user.save()

            return make_response(
                jsonify({
                        "message":"Sign up successful. User has been created!"
                    }), 201
            )
        except:
            return make_response(
                jsonify({
                        "error_msg": "Failed to add user. Please try again later"
                    }), 500
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
                    'error_msg': "Passowrd is invalid. Please input a valid password!"
                }
            ), 400)

        
        current_user = None

        if Serialization.test_email(data.username):
            current_user = UserModel.find_user_by_email(data.username)
        else:
            current_user = UserModel.find_user_by_username(data.username)

        if not current_user:
            return make_response(jsonify(
                {
                    'message': 'User {} doesn\'t exist'.format(data.username)
                }
            ), 404)

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
                'message': 'Logged in as {}'.format(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
            })

            return resp,200
        else:
            return make_response(jsonify(
                {
                'error_msg': 'Wrong user credentials. Please input correct username and password'
                }),401)

    @staticmethod
    def log_out():
        jti = get_raw_jwt()['jti']

        try:
            revoked_token = RevokedTokenModel(token=jti)
            revoked_token.insert()

            resp = jsonify({
                'message': 'Access token has been revoked'}
            )

            return resp, 200
        except:
            return jsonify({
                'error_msg': 'Something went wrong'}
            ), 500