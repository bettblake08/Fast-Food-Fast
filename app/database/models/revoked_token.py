""" This module hosts the RevokedTokenModel class used to blacklist access tokens """

from app.database import DB
from app.database.db_model import DBModel


class RevokedTokenModel(DBModel):

    table = "expired_tokens"

    """ 
    CREATE TABLE IF NOT EXISTS orders(
    token CHAR(120) NOT NULL
    );
    """

    id = None

    def __init__(self, token):
        """ This is the initialization function for the RevokedTokenModel

        Args:
            token   :   Revoked token

        Attributes:
            database_connection     :   An instance of the DB class
            token  :   Token string

        """

        self.token = token

        super().__init__()

    def insert(self):
        """ This is the row insert function to insert the class data into database. 

            Returns:
                bool: Returns True is insert succeeded or False if it failed.
        """

        query = """ 
        INSERT INTO {}(token) values(%s)
        """.format(self.table)

        try:
            self.database_connection.cursor.execute(query, (self.token))
            self.database_connection.db_connection.commit()

            return True
        except:
            return False

    @classmethod
    def is_token_blacklisted(cls, token):
        """ This function is used to check whether a token has been blacklisted

        Args:
            token   : Token string

        Returns:
            bool    :   True if found, False if not found
        """

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = """ 
        SELECT * FROM {} WHERE token = '{}'
        """.format(cls.table, token)

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        return bool(database_connection.cursor.fetchone())
