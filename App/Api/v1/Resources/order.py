from flask_restful import Resource,reqparse
from App.Database import orders, items


""" Order Resource 

Handles the updating and retrieval of orders

"""

class Order(Resource):
    def get(self,param):
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

        orderId = param

        ordered = {}

        for ordered in orders:
            if ordered['id'] == int(orderId):
                order = ordered

                for orderedItem in order['items']:
                    for item in items:
                        if item['id'] == orderedItem['id']:
                            orderedItem['details'] = item

        if order == {}:
            return {
                'error': 1, 
                "error_msg":"Order does not exist. Please enter a valid order id."
                }, 200

        return {
            'error': 0, 
            "content": ordered
            }, 200


    def put(self,param):
        """ Update order status endpoint

        Arguments:
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

        status = param

        data = parser.parse_args()

        if data.status not in [0, 1, 2 ,3]:
            return {
                'error': 1, 
                'error_msg': "Invalid status number. Please provide a valid status number"
                }, 200

        found = False

        for ordered in orders:
            if ordered['id'] == int(status):
                found = True
                ordered['status'] = int(data.status)
        
        if not found:
            return {
                'error': 2, 
                'error_msg':"Order not found. Please provide a valid order id"
                }, 200

        return {
            'error':0,
            'content':orders
            },200
