from flask import jsonify, make_response
from flask_restful import reqparse
from flask_jwt_extended import create_access_token, create_refresh_token, \
    set_access_cookies, set_refresh_cookies, unset_jwt_cookies, get_raw_jwt

from app.managers.serialization import Serialization, flask_bcrypt
from app.database.models import UserModel, RevokedTokenModel


class LoginViews():
    """ This class stores all the routes required for authentication """

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
                    'message': "Password is invalid. Please input a valid password!"
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
                'message': "Logged in as " + str(current_user.username),
                'access_token': access_token,
                'refresh_token': refresh_token
            })

            return resp,200
        else:
            return make_response(
                jsonify(
                    {
                        'message': 'Wrong user credentials. Please input correct username and password'
                    }),401
                )

    @staticmethod
    def log_out():
        jti = get_raw_jwt()['jti']

        revoked_token = RevokedTokenModel(token=jti)

        try:
            revoked_token.insert()

            resp = jsonify({
                'message': 'Access token has been revoked!'}
            )

            return make_response(resp, 200)
        except:
            return make_response(
                jsonify(
                    {
                        'message': 'Something went wrong'
                    }), 500
            )
