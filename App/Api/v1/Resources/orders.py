from flask_restful import Resource, reqparse
from App.Database.Models import OrderModel
from App.Database import items
from flask import json


""" Orders Resource 

Handles the creation and retrieval of orders

"""



class Orders(Resource):
    def get(self):
        """ Fetch all orders endpoint

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content list with all orders

            - If orders are not present
                - A response with a status code 200
                - An empty content list
        
        """

        #Fetch all orders endpoint

        orders = OrderModel.get_all_orders()
        
        return {
            'error': 0,
            "content": [x.json() for x in orders]
        }, 200


    def post(self):
        """ Place an order endpoint

        Arguments:
            - items (list) : A list of objects each containing a item id (int) and quantity(int)

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content list with all orders

            - If orders are not present
                - A response with a status code 200
                - An empty content list
        
        """

        parser = reqparse.RequestParser()

        parser.add_argument("items",
                            required=True,
                            help="The item list is required")

        data = parser.parse_args()

        total = 0
        orderItems = []

        try :
            for orderedItem in json.loads(data['items']):
                found = False

                for item in items:
                    if orderedItem['id'] == item['id']:
                        found = True

                        total += item['price'] * orderedItem['quantity']
                        orderItems.append({
                            'id': orderedItem['id'],
                            'quantity': orderedItem['quantity']
                        })

                if not found:
                    return {
                        'error': 1, 
                        'error_msg': "Item " + str(orderedItem['id']) + " doesn't exist!"
                        }, 200
        except:
            return {
                'error': 2, 
                'error_msg':"Items list is invalid. Please check to see all items id and quantity properties."
                }, 200

        order = OrderModel(
            userId=1000001,
            items=orderItems,
            total=total,
            status=0)

        order.save()

        return {
            'error': 0
            }, 200
