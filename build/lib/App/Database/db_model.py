from App.Database import DB
from instance.config import app_config


class DBModel():
    id = None
    table = ""

    connection = "dbname=" + app_config['TEST'].DB_NAME
    connection += " user=" + app_config['TEST'].DB_USER
    connection += " password=" + app_config['TEST'].DB_PASSWORD
    connection += " host=" + app_config['TEST'].DB_HOST