from flask_restful import Resource, reqparse
from App.Database.Models import OrderModel



""" Order Resource 

Handles the updating and retrieval of orders

"""

class Order(Resource):
    def get(self, param):
        """ Fetch order data endpoint

        Arguments:
            - param (int): this is the order id of the order to fetch

        Returns:
            - If orders are present
                - A response with a status code 200
                - A content field in response body with order data
                - An error number 0 in response body

            - If orders are not present
                - A response with a status code 200
                - An error number 1 in response body
                - An error msg in response
        
        """
        try:
            param = int(param)
        except:
            return {}, 400
  

        order = {}

        order = OrderModel.get(param)

        if not bool(order):
            return {
                'error': 1,
                "error_msg": "Order does not exist. Please enter a valid order id."
                }, 200

        return {
            'error': 0,
            "content": order.json()
            }, 200


    def put(self,param):
        """ Update order status endpoint

        Arguments:
            - param (int):  An order id 
            - status (int) : A status number used as a representation of the order status

        Returns:
            - If status argument is not present and of valid type
                - A response with a status code 400
                - An error_msg stating "Status field required. Please provide a new status for the order."

            - If status argument is incorrect 
                - A response with a status code 200
                - An error number 1 in response body
                - An error msg in response

            - If order not found 
                - A response with a status code 200
                - An error number 2 in response body
                - An error msg in response

            - If update succeeded 
                - If status argument is incorrect 
                - A response with a status code 200
                - An error number 0 in response body
        
        """
  
        parser = reqparse.RequestParser()

        parser.add_argument(
            'status',
            type=int,
            required=True,
            help="Status field required. Please provide a new status for the order."
        )

        data = parser.parse_args()

        orderId = param

        if data.status not in [0, 1, 2 ,3]:
            return {
                'error': 1, 
                'error_msg': "Invalid status number. Please provide a valid status number"
                }, 200

        order = OrderModel.get(orderId)

        if not order:
            return {
                'error': 2, 
                'error_msg': "Order not found. Please provide a valid order id"
                }, 200

        order.status = data.status
        order.update()

        return {
            'error': 0
            }, 200
