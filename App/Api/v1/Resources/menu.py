from flask_restful import Resource, reqparse
from App.Database.Models import OrderItemModel


class Menu(Resource):
    def get(self):
        # Fetch menu items endpoint
        items = OrderItemModel.get_all_items()

        if not bool(items):
            return {
                'error': 1,
                "error_msg": "Order does not exist. Please enter a valid order id."}, 200

        return {
            'error': 0,
            "content": [ x.json() for x in items]
            }, 200

    def post(self):
        #   Post a new menu item endpoint

        parser = reqparse.RequestParser()

        parser.add_argument(
            'name',
            required=True,
            help="Name field required. Please provide a name for the item."
        )

        parser.add_argument(
            'price',
            type=float,
            required=True,
            help="Price field required. Please provide a price for the item as an integer."
        )

        parser.add_argument(
            'c_id',
            type=int,
            required=True,
            help="c_id (Category Id) field required. Please provide a valid category id of integer type."
        )

        data = parser.parse_args()

        if int(data.c_id) not in [0, 1, 2, 3]:
            return {
                'error': 1, 
                'error_msg': "Invalid status number. Please provide a valid status number"
                }, 200

        item = OrderItemModel(
            name=data.name,
            price=data.price * 100,
            c_id = data.c_id)
        
        try:    
            item.save()

            return {
                'error': 0
            }, 200
        except:
            return {
                'error_msg': "Failed to process new order item. Please try again!"
            }, 400
    
