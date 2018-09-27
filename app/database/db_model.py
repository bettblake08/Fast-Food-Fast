import os
from app.database import DB
from instance.config import app_config


class DBModel():
    """ This is the base model for all database model classes. 
    
    Attributes:
        id:         This is the primary id of a row stored in a table
        table:      This is the table name of the table the model represents
        connection: This is the connection url for the database, required to establish a connection with the database

    """
    

    id = None
    table = ""

    connection = "dbname=" + app_config[os.getenv('APP_ENV')].DB_NAME
    connection += " user=" + app_config[os.getenv('APP_ENV')].DB_USER
    connection += " password=" + app_config[os.getenv('APP_ENV')].DB_PASSWORD
    connection += " host=" + app_config[os.getenv('APP_ENV')].DB_HOST

    def __init__(self):
        """ Initialized the database model by storing an instance of the DB class
        """
        self.db = DB()
