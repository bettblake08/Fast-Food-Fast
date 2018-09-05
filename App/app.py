from flask import Flask
from flask_restful import Api
from os import path

from App.Resources.resources import Orders

here = path.abspath(path.dirname('./'))
template_dir = path.abspath('./Resources/Views/')

app = Flask(__name__, template_folder=template_dir)

api = Api(app)

api.add_resource(Orders, "/api/v1/orders")
