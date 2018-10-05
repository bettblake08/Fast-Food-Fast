""" This module hosts the DBModel class used as the base class for all database models
"""

import os
from app.database import DB
from instance.config import app_config

CONNECTION = "dbname=" + app_config[os.getenv('APP_ENV')].DB_NAME
CONNECTION += " user=" + app_config[os.getenv('APP_ENV')].DB_USER
CONNECTION += " password=" + app_config[os.getenv('APP_ENV')].DB_PASSWORD
CONNECTION += " host=" + app_config[os.getenv('APP_ENV')].DB_HOST

database_connection = DB()
database_connection.connect(CONNECTION)

class DBModel():
    """ This is the base model for all database model classes.
    Attributes:
        id:         This is the primary id of a row stored in a table
        table:      This is the table name of the table the model represents
        connection: This is the connection url for the database, required to 
                    establish a connection with the database
    """

    id = None
    table = ""

    database_connection = database_connection

    def __init__(self):
        """ Initialized the database model by storing an instance of the DB class
        """
        pass
        