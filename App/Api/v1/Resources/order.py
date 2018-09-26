from flask_restful import Resource, reqparse
from App.Database.Models import OrderModel
from App.Api.v1.decorators import user_required



""" Order Resource 

Handles the updating and retrieval of orders

"""

class Order(Resource):
    @user_required(2)
    def get(self, param):
        
    @user_required(2)
    def put(self,param):
        
