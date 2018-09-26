from flask import jsonify, make_response
from flask_restful import reqparse
from flask_jwt_extended import create_access_token,create_refresh_token, \
        set_access_cookies,set_refresh_cookies,unset_jwt_cookies,get_raw_jwt
from App.Managers.Serialization import Serialization
from werkzeug.security import generate_password_hash

from App.Database.Models import UserModel,RevokedTokenModel


class MainController():
    @staticmethod
    def authenticate(username, password):
        user = UserModel.find_user_by_username(username,1)
        if user and user.authenticate(password):
            return user

    @staticmethod
    def identity(payload):
        user_id = payload['identity']
        return UserModel.get(user_id,1)

    @classmethod
    def signUp(cls):
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

        data = parser.parse_args()

        if not Serialization.test_email(data.email):
            return make_response(
                jsonify(
                    {
                        "error": 1,
                        "error_msg": "Incorrect email. Please input a valid email string."
                    }
                ), 200
            )

        if not Serialization.test_password(data.password,1):
            return make_response(
                jsonify(
                    {
                        "error": 2,
                        "error_msg": "Incorrect password. Please input a valid password string."
                    }
                ), 200
            )

        if UserModel.find_user_by_username(data.username,1):
            return make_response(
                jsonify(
                    {
                        "error": 3,
                        "error_msg": "user already exists. Please use another username."
                    }
                ), 200
            )

        elif UserModel.find_user_by_email(data.email,1):
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
            password=generate_password_hash(data.password))

        try:
            user.save()
            
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
    def loginAuth():
        parser = reqparse.RequestParser()
        parser.add_argument('username',
                            required=True,
                            help="The username field is required")

        parser.add_argument('password',
                            required=True,
                            help="The password field is required")

        data = parser.parse_args()

        current_user = None

        if Serialization.test_email(data.username):
            current_user = UserModel.find_user_by_email(data.username,1)
        else:
            current_user = UserModel.find_user_by_username(data.username, 1)

        if not current_user:
            return make_response(jsonify(
                {
                "error": 1,
                'message': 'User {} doesn\'t exist'.format(data.username)
                }
            ), 200)

        if not Serialization.test_password(data['password'], 1):
            return make_response(jsonify(
                {
                'error': 2
                }
            ), 200)

        print("Password Test : " +
              str(current_user.authenticate(data.password)))


        if current_user.authenticate(data['password']):
            access_token = create_access_token(
                identity=current_user.id)
            refresh_token = create_refresh_token(
                identity=current_user.id)

            resp = jsonify({
                'error': 0,
                'message': 'Logged in as {}'.format(current_user.username)
            })

            set_access_cookies(resp, access_token, 900)
            set_refresh_cookies(resp, refresh_token)

            return resp
        else:
            return make_response(jsonify({
                'error': 3,
                'message': 'Wrong credentials'}),
                200)


    @staticmethod
    def adminLogOut():
        jti = get_raw_jwt()['jti']

        try:
            revoked_token = RevokedTokenModel(token=jti)
            revoked_token.insert()

            resp = jsonify({
                "error": 0, 
                'error_msg': 'Access token has been revoked'}
                )
            unset_jwt_cookies(resp)

            return resp,200
        except:
            return jsonify({
                "error": 1, 
                'error_msg': 'Something went wrong'}
                ), 500
