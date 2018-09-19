from flask import Flask

from instance.config import app_config
from .Api.v1.views import api_v1

def create_app(config_name='DEV'):
    app = Flask(__name__,instance_relative_config=True)

    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')

    app.register_blueprint(api_v1,url_prefix="/api/v1")

    return app