from flask_restful import Resource, reqparse
from App.Database.Models import OrderModel


class Order(Resource):
    def get(self, param):
        # Fetch order data endpoint
        param = int(param)

        if not isinstance(param, int) or param < 0:
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

    def put(self, param):
        #   Update order status endpoint

        parser = reqparse.RequestParser()

        parser.add_argument(
            'status',
            required=True,
            help="Status field required. Please provide a new status for the order."
        )

        data = parser.parse_args()

        if int(data.status) not in [0, 1, 2, 3]:
            return {
                'error': 1, 
                'error_msg': "Invalid status number. Please provide a valid status number"
                }, 200

        order = OrderModel.get(int(param))

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
