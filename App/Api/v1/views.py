
from functools import wraps

from flask import Blueprint,redirect,url_for,jsonify
from flask_restful import Api
from flask_jwt_extended import JWTManager,get_jwt_claims,verify_fresh_jwt_in_request

from App.Database.Models import UserModel,RevokedTokenModel

from App.Api.v1.Controllers import MainController

from .Resources import Order, Orders


api_v1 = Blueprint('api', __name__)
mc = MainController()

api = Api(api_v1)

api.add_resource(Orders, "/orders")
api.add_resource(Order, "/order/<string:param>")


jwt = JWTManager()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return RevokedTokenModel.is_token_blacklisted(jti)

@jwt.unauthorized_loader
@jwt.invalid_token_loader
@jwt.expired_token_loader
def redirect_to_login(e):
    return redirect(url_for("user_login_up"))


def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **param):
        verify_fresh_jwt_in_request()

        claims = get_jwt_claims()

        if claims['role'] != param['role']:
            role = ""
            if param['role'] == 1:
                role = "customer"
            elif param['role'] == 2:
                role = "admin"

            return jsonify({
                "error_msg":'Only {} users have permission to access!'.format(role)
            }), 403
        else:
            return fn(*args, **param)
    
    return wrapper


@api_v1.route('/auth/signup', methods=['POST'])
def user_sign_up():
    return mc.signUp()


@api_v1.route('/auth/login', methods=['POST'])
def user_login_in():
    return mc.loginAuth()
