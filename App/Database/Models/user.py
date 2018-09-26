from App.Database import DB
from App.Database.db_model import DBModel

from werkzeug.security import check_password_hash


class UserModel(DBModel):

    table = "users"

    """ 
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        username CHAR(60) NOT NULL,
        email CHAR(60) NOT NULL,
        password CHAR(120) NOT NULL,
        role INT NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ 
    );
    """

    """ 
    Role Id
    1 - Customer
    2 - Admin
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
        self.role = param['role'] if 'role' in param else 1


    def insert(self):
        q = """ 
        INSERT INTO {}(username,email,password,role,created_at,updated_at) values(%s,%s,%s,%s,NOW(),NOW()) RETURNING id
        """.format(self.table)

        self.db.cursor.execute(q, (self.username, self.email, self.password,self.role))
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
            'role':self.role,
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
    def find_user_by_username(cls, username):
        db = DB()
        db.connect(cls.connection)


        q = """ 
            SELECT * FROM {} WHERE username = '%s'
            """.format(cls.table) % username

        db.cursor.execute(q)
        db.conn.commit()

        result = db.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)
        else:
            return None



    @classmethod
    def find_user_by_email(cls, email):
        db = DB()
        db.connect(cls.connection)

        q = """ 
            SELECT * FROM {} WHERE email = '%s'
            """.format(cls.table) % email

        db.cursor.execute(q)
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
        user = cls(
            username=row[1],
            email=row[2],
            password=row[3],
            role=row[4])

        user.id = row[0]
        user.created_at = str(row[5])
        user.updated_at = str(row[6])

        return user


    def authenticate(self,password):
        print(self.password)
        print(password)
        
        return check_password_hash(self.password,password)


    def save(self):
        if not bool(self.id):
            self.insert()
        else:
            self.update()
