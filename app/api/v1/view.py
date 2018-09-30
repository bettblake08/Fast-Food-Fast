from functools import wraps

from flask import Blueprint, redirect, url_for, \
    jsonify, make_response, json, request
from flask_restful import Api, reqparse
from flask_jwt_extended import JWTManager, get_jwt_claims, verify_fresh_jwt_in_request, get_jwt_identity,\
    jwt_refresh_token_required, create_access_token, set_access_cookies

from app.database.models import UserModel, RevokedTokenModel, OrderModel, OrderedItemModel, OrderItemModel
from app.api.v1.views import LoginViews, AdminViews, MainViews, UserViews
from app.api.v1.decorators import user_required


api_v1 = Blueprint('api', __name__)

login_views = LoginViews()
admin_views = AdminViews()
user_views = UserViews()
main_views = MainViews()

api = Api(api_v1)
jwt = JWTManager()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    token = decrypted_token['jti']
    return RevokedTokenModel.is_token_blacklisted(token)


@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    """ 
    Role Id
    1 - Customer
    2 - Admin
    """

    return {
        'role': identity['role']
    }


@api_v1.route('/auth/signup', methods=['POST'])
def user_sign_up():
    return login_views.sign_up()


@api_v1.route('/auth/login', methods=['POST'])
def user_login_in():
    return login_views.login_auth()


@api_v1.route('/auth/logout')
def logOutRefresh():
    return login_views.log_out()


@api_v1.route('/token/refresh')
@jwt_refresh_token_required
def refresh_token():
    user = get_jwt_identity()
    resp = jsonify({
        'error': 0,
        'access_token': create_access_token(identity=user, fresh=True)
    })

    return resp


@api_v1.route("/order/<string:order_id>")
@user_required(2)
def get_order(order_id):
    return admin_views.get_order(order_id)


@api_v1.route("/order/<string:order_id>", methods=['PUT'])
@user_required(2)
def update_order(order_id):
    return admin_views.update_order(order_id)


@api_v1.route('/orders')
@user_required(2)
def get_all_orders():
    return admin_views.get_all_orders()


@api_v1.route("/users/orders", methods=['POST'])
@user_required(1)
def post_new_order():
    return user_views.post_a_new_order()


@api_v1.route('/menu')
def get_all_menu_items():
    return main_views.get_menu()


@api_v1.route("/menu", methods=['POST'])
@user_required(2)
def post_new_order_item():
    return admin_views.post_new_order_item()


@api_v1.route("/users/orders")
@user_required(1)
def get_user_order_history():
    return user_views.get_user_order_history()
