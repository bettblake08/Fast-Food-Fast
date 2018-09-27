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
            db     :   An instance of the DB class
            token  :   Token string
       
        """

        self.db = DB()
        self.db.connect(self.connection)

        self.token = token


    def insert(self):
        """ This is the row insert function to insert the class data into database. 

            Returns:
                bool: Returns True is insert succeeded or False if it failed.
        """

        q = """ 
        INSERT INTO {}(token) values(%s)
        """.format(self.table)

        try:    
            self.db.cursor.execute(q, (self.token))
            self.db.conn.commit()

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

        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE token = '{}'
        """.format(cls.table, token)

        db.cursor.execute(q)
        db.conn.commit()

        return bool(db.cursor.fetchone())
