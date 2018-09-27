from App.Database import DB
from App.Database.db_model import DBModel


class OrderItemModel(DBModel):

    table = "order_items"

    """ 
    CREATE TABLE IF NOT EXISTS order_items(
        id SERIAL PRIMARY KEY NOT NULL,
        name CHAR(120) NOT NULL,
        price INT NOT NULL,
        c_id INT NOT NULL,
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

        self.name = param['name']
        self.price = param['price']
        self.c_id = param['c_id']

    @classmethod
    def get_object(cls, row):
        item = cls(
            name=row[1],
            price=row[2],
            c_id=row[3])

        item.id = row[0]
        item.created_at = row[4]
        item.updated_at = row[5]

        return item


    def insert(self):
        q = """ 
        INSERT INTO {}(name,price,c_id,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
        """.format(self.table)

        self.db.cursor.execute(q, (self.name, self.price, self.c_id))
        self.db.conn.commit()

        itemId = self.db.cursor.fetchone()[0]

        self.id = itemId
        """ 
            try : 
                return True
            except:
                return False """


    def update(self):
        q = """ 
        UPDATE %s SET name = %s,price = %s,c_id = %s, updated_at = NOW() WHERE id = {} 
        """

        self.db.cursor.execute(q, 
            (
                self.table, 
                self.name, 
                self.price, 
                self.c_id,
                self.id
            )
        )

        self.db.conn.commit()


    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'c_id': self.c_id,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    @classmethod
    def get(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM %s WHERE id = %s
        """ % (cls.table , _id)

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
        SELECT * FROM %s WHERE id = %s
        """ % (cls.table, _id)

        db.cursor.execute(q)
        db.conn.commit()

        db.cursor

    @classmethod
    def get_all_items(cls):

        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM %s
            """

            db.cursor.execute(q,(cls.table))

            db.conn.commit()
            results = db.cursor.fetchall()

        except:
            return None

        response = []

        for r in results:
            response.append(cls.get_object(r))

        return response

    

    def save(self):
        if not bool(self.id):
            self.insert()
        else:
            self.update()
