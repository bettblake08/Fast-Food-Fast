from flask_restful import Resource
from App.Database.db import orders,items

class Orders(Resource):
    def get(self):
        
        for o in orders:
            for i in o['items']:
                for item in items:
                    if item['id'] == i['id']:
                        i['details'] = item

        return {'error':0, "content":orders},200
