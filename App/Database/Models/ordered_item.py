from App.Database import DB
from App.Database.db_model import DBModel


class OrderedItemModel(DBModel):

    table_script = """ 
        CREATE TABLE IF NOT EXISTS ordered_items(
            id INT PRIMARY KEY NOT NULL,
            orderId INT FOREIGN_KEY NOT NULL,
            item INT REFERENCES order(id)
            quantity INT NOT NULL
        );
    """

    id = None


    def __init__(self, **param):
        self.db = DB()
        self.db.connect(self.connection)

        self.orderId = param['order']
        self.item = param['item']
        self.quantity = param['quantity']


    def insert(self):

        q = """ 
        INSERT INTO ordered_items(orderId,item,quantity) values({},{},{})
        """.format(self.orderId, self.item, self.quantity)

        self.db.cursor.execute(q)
        self.db.conn.commit()


    def update(self):
        q = """ 
        UPDATE ordered_items SET orderId = {},item = {},quantity = {} WHERE id = {} 
        """.format(self.orderId, self.item, self.quantity, self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()


    def json(self):
        return {
            'id': self.id,
            'order': self.orderId,
            'item': self.item,
            'quantity': self.quantity
        }


    def exists(self):
        q = """ 
        SELECT * FROM ordered_items WHERE id = {}
        """.format(self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()

        results = self.db.cursor.fetchone()

        if len(results) > 0:
            return True
        else:
            return False


    @classmethod
    def get(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM ordered_items WHERE id = {}
        """.format(_id)

        db.cursor.execute(q)
        db.conn.commit()

        result = db.cursor.fetchone()

        if len(result) > 0:
            order = cls(
                order=result[1],
                item=result[2],
                quantity=result[3])

            order.id = result[0]

            return order
        else:
            return None


    @classmethod
    def find_all_order_items(cls, orderId):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM ordered_items WHERE orderId = {}
        """.format(orderId)

        db.cursor.execute(q)
        db.conn.commit()

        results = db.cursor.fetchall()

        if len(results) > 0:
            response = []

        for r in results:
            order = cls(
                order=r[1],
                item=r[2],
                quantity=r[3])

            order.id = r[0]

            response.append(order)

            return response
        else:
            return None


    def save(self):
        if not bool(self.id):
            self.insert()
        else:
            self.update()