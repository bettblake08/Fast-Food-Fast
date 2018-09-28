from flask import Flask

from instance.config import app_config
from App.api.v1.view import api_v1, jwt
from App.managers.serialization import flask_bcrypt


def create_app(config_name='DEV'):
    """ This function is used to generate an instance of the flask application 
    
        Args:
            config_name :   App environment name. ['DEV','PROD','TEST']

        Returns:
            Flask():    An instance of the flask application
    """

    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')

    app.register_blueprint(api_v1, url_prefix="/api/v1")

    jwt.init_app(app)
    flask_bcrypt.init_app(app)

    return app
