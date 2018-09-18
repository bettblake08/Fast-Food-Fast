from flask_restful import Resource,reqparse
from App.Database.db import orders,items
from flask import json

class Orders(Resource):
    def get(self):
        #Fetch all orders endpoint
        for o in orders:
            for i in o['items']:
                for item in items:
                    if item['id'] == i['id']:
                        i['details'] = item

        return {'error':0, "content":orders},200

    def post(self):
        #Place an order endpoint
        parser = reqparse.RequestParser()

        parser.add_argument("items",
                            required=True,
                            help="The item list is required")

        data = parser.parse_args()

        total = 0
        orderItems = []

        try :
            for i in json.loads(data['items']):
                found = False

                for x in items:
                    if i['id'] == x['id']:
                        found = True

                        total += x['price'] * i['quantity']
                        orderItems.append({
                            'id':i['id'],
                            'quantity':i['quantity']
                        })

                if not found:
                    return {'error': 1, 'error_msg': "Item " + str(i['id']) + " doesn't exist!"}, 200
        except:
            return {'error': 2, 'error_msg':"Items list is invalid. Please check to see all items id and quantity properties."}, 200

        newOrder = {
            "id":10001,
            "userId":10000001,
            "items":orderItems,
            "total":total,
            "status":0
        }

        orders.append(newOrder)

        return {'error':0}, 200


