from App.Database import DB
from App.Database.db_model import DBModel


class RevokedTokenModel(DBModel):

    table = "expired_tokens"

    """ 
    CREATE TABLE IF NOT EXISTS orders(
    token CHAR(120) NOT NLL
    );
    """

    id = None


    def __init__(self, token):
        self.db = DB()
        self.db.connect(self.connection)

        self.token = token


    def insert(self):
        q = """ 
        INSERT INTO {}(token) values(%s)
        """.format(self.table)

        self.db.cursor.execute(q, (self.token))
        self.db.conn.commit()


    @classmethod
    def is_token_blacklisted(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE token = '{}'
        """.format(cls.table,_id)

        db.cursor.execute(q)
        db.conn.commit()

        return bool(db.cursor.fetchone())
