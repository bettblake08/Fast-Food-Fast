from App.Database import DB
from App.Database.db_model import DBModel


class UserModel(DBModel):

    table = "users"

    """ 
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        username CHAR(60) NOT NULL,
        email CHAR(60) NOT NULL,
        password CHAR(120) NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ 
    );
    """

    id = None
    created_at = None
    updated_at = None


    def __init__(self, **param):
        self.db = DB()
        self.db.connect(self.connection)
        self.username = param['username']
        self.email = param['email']
        self.password = param['password']


    def insert(self):
        q = """ 
        INSERT INTO {}(username,email,password,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
        """.format(self.table)

        self.db.cursor.execute(q, (self.username, self.email, self.password))
        self.db.conn.commit()

        userId = self.db.cursor.fetchone()[0]
        self.id = userId


    def update(self):
        q = """ 
        UPDATE {} SET username = %s,email = %s,password = %s, updated_at = NOW() WHERE id = {} 
        """.format(self.table,self.id)

        self.db.cursor.execute(q,(self.username,self.email,self.password))
        self.db.conn.commit()


    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }


    @classmethod
    def get(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE id = %s
        """.format(cls.table)

        db.cursor.execute(q,(_id))
        db.conn.commit()

        result = db.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)
        else:
            return None


    @classmethod
    def exists(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE id = {}
        """.format(cls.table,_id)

        db.cursor.execute(q)
        db.conn.commit()

        db.cursor


    @classmethod
    def get_object(cls,row):
        order = cls(
            userId=row[1],
            total=row[2],
            status=row[3])

        order.id = row[0]
        order.created_at = str(row[4])
        order.updated_at = str(row[5])



    def save(self):
        if not bool(self.id):
            self.insert()
        else:
            self.update()