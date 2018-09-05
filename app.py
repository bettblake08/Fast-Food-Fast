from flask import Flask
from flask_restful import Api
from os import path

here = path.abspath(path.dirname('./'))
template_dir = path.abspath('./Resources/Views/')

app = Flask(__name__, template_folder=template_dir)

api = Api(app)

if __name__ == "__main__":
    app.run()
