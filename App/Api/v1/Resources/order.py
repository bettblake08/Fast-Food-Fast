from flask_restful import Resource,reqparse
from App.Database.db import orders, items

class Order(Resource):
    def get(self,param):
        # Fetch order data endpoint
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


    def put(self,param):
        #   Update order status endpoint
        parser = reqparse.RequestParser()

        parser.add_argument(
            'status',
            required=True,
            help="Status field required. Please provide a new status for the order."
        )

        data = parser.parse_args()

        if int(data.status) not in [0, 1, 2 ,3]:
            return {'error': 1, 'error_msg': "Invalid status number. Please provide a valid status number"}, 200

        found = False

        for o in orders:
            if o['id'] == int(param):
                found = True
                o['status'] = int(data.status)
        
        if not found:
            return {'error': 2, 'error_msg':"Order not found. Please provide a valid order id"}, 200

        return {'error':0,'content':orders},200
