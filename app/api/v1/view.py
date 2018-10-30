from functools import wraps

from flask import (Blueprint, json, jsonify, make_response, redirect, request,
                   url_for, session)
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_claims, get_jwt_identity,
                                jwt_refresh_token_required, jwt_required,
                                set_access_cookies,
                                verify_fresh_jwt_in_request)
from flask_restful import reqparse

from app.api.v1.decorators import user_required
from app.api.v1.views import AdminViews, LoginViews, MainViews, UserViews
from app.database.models import (OrderedItemModel, OrderItemModel, OrderModel,
                                 RevokedTokenModel, UserModel)

api_v1 = Blueprint('api', __name__)

login_views = LoginViews()
admin_views = AdminViews()
user_views = UserViews()
main_views = MainViews()

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
    return main_views.sign_up()


@api_v1.route('/auth/login', methods=['POST'])
def user_login_in():
    return login_views.login_auth()


@api_v1.route('/auth/logout')
@jwt_required
def logOutRefresh():
    return login_views.log_out()


@api_v1.route('/token/refresh')
@jwt_refresh_token_required
def refresh_token():
    user = get_jwt_identity()
    resp = jsonify({
        'message': "Refresh successful!",
        'access_token': create_access_token(identity=user, fresh=True)
    })

    session["loggedInUser"] = {
        'loggedIn': True,
        'role': user['role']
    }

    return resp,201


@api_v1.route("/order/<string:order_id>")
@user_required('admin')
def get_order(order_id):
    return admin_views.get_order(order_id)


@api_v1.route("/order/<string:order_id>", methods=['PUT'])
@user_required('admin')
def update_order(order_id):
    return admin_views.update_order(order_id)


@api_v1.route('/orders')
@user_required('admin')
def get_all_orders():
    return admin_views.get_all_orders()


@api_v1.route("/users/orders", methods=['POST'])
@user_required('customer')
def post_new_order():
    return user_views.post_a_new_order()


@api_v1.route('/menu')
def get_all_menu_items():
    return main_views.get_menu()


@api_v1.route("/menu", methods=['POST'])
@user_required('admin')
def post_new_order_item():
    return admin_views.post_new_order_item()


@api_v1.route("/users/orders")
@user_required('customer')
def get_user_order_history():
    return user_views.get_user_order_history()
