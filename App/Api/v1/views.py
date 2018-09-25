from flask import Blueprint
from .Resources import Order, Orders , Menu
from flask_restful import Api

api_v1 = Blueprint('api', __name__)
api = Api(api_v1)

api.add_resource(Orders, "/orders")
api.add_resource(Order, "/order/<string:param>")
api.add_resource(Menu,"/menu")