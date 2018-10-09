""" This module hosts the flask application initialization function
    used to generate the app instance.
"""
from os import path
from flask import Flask

from instance.config import app_config
from app.api.v1.view import api_v1, jwt
from app.managers.serialization import flask_bcrypt

from app.routes import admin_pages, main_pages, customer_pages 


def create_app(config_name='DEFAULT'):
    """ This function is used to generate an instance of the flask application
    Args:
        config_name :   App environment name. ['DEV','PROD','TEST']
    Returns:
        Flask():    An instance of the flask application
    """
    template_dir = path.abspath('./app/templates/ui/')
    static_dir = path.abspath('../static/')

    app = Flask(__name__,
            template_folder=template_dir,
            static_folder=static_dir,
            instance_relative_config=True)

    app.config.from_object(app_config[config_name])

    app.register_blueprint(main_pages, url_prefix="/")
    app.register_blueprint(customer_pages, url_prefix="/customer")
    app.register_blueprint(admin_pages, url_prefix="/admin")
    
    app.register_blueprint(api_v1, url_prefix="/api/v1")

    jwt.init_app(app)
    flask_bcrypt.init_app(app)

    return app
