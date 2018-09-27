import os
from App.Database import DB
from instance.config import app_config


class DBModel():
    id = None
    table = ""

    connection = "dbname=" + app_config[os.getenv('APP_ENV')].DB_NAME
    connection += " user=" + app_config[os.getenv('APP_ENV')].DB_USER
    connection += " password=" + app_config[os.getenv('APP_ENV')].DB_PASSWORD
    connection += " host=" + app_config[os.getenv('APP_ENV')].DB_HOST

    def __init__(self):
        self.db = DB()
