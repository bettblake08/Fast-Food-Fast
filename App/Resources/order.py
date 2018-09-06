from flask_restful import Resource
from App.Database.db import orders, items

class Order(Resource):
    def get(self,param):
        order = {}

        for o in orders:
            if o['id'] == int(param):
                order = o

                for i in order['items']:
                    for item in items:
                        if item['id'] == i['id']:
                            i['details'] = item

        if order == {}:
            return {'error': 1, "error_msg":"Order does not exist. Please enter a valid order id."}, 200

        return {'error': 0, "content": order}, 200
