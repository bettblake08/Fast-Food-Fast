from flask import jsonify, make_response
from flask_restful import reqparse
from App.Managers.Serialization import Serialization
from werkzeug.security import generate_password_hash

from App.Database.Models import UserModel


class MainController():
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
            return {
                "error": 1,
                "error_msg": "Incorrect email. Please input a valid email string."
            }, 200

        if not Serialization.test_password(data.password,1):
            return {
                "error":2,
                "error_msg":"Incorrect password. Please input a valid password string."
            },200

        user = UserModel(
            username=data.username,
            email=data.email,
            password=generate_password_hash(data.password))

        user.save()
        
        """ try:
            user.save()
            
            return {
                "error":0
            },200
        except:
            return {
                "error_msg":"Failed to add user. Please try again later"
            },400 """
        
