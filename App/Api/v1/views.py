from flask import Blueprint
from .Resources import Order, Orders
from flask_restful import Api
from App.Database.Models.user import UserModel
from App.Api.v1.Controllers import MainController


api_v1 = Blueprint('api', __name__)
api = Api(api_v1)

api.add_resource(Orders, "/orders")
api.add_resource(Order, "/order/<string:param>")

mc = MainController()



@api_v1.route('/auth/signup',methods=['POST'])
def user_sign_up():
    return mc.signUp()