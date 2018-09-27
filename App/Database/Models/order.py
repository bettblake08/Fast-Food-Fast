from App.Database import DB
from App.Database.Models.ordered_item import OrderedItemModel
from App.Database.db_model import DBModel


class OrderModel(DBModel):

    """ 
    CREATE TABLE IF NOT EXISTS orders(
    id INT PRIMARY KEY NOT NULL,
    userId INT NOT NULL,
    total INT NOT NULL,
    status INT NOT NULL,
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
        self.userId = param['userId']
        self.items = param['items'] if 'items' in param else []
        self.total = param['total']
        self.status = param['status']


    @classmethod
    def get_object(cls,row):
        user = cls(
            userId=row[1],
            total=row[2],
            status=row[3])

        user.id = row[0]
        user.created_at = str(row[4])
        user.updated_at = str(row[5])

        return user


    def insert(self):
        q = """ 
        INSERT INTO orders(userId,total,status,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
        """

        self.db.cursor.execute(q, (self.userId, self.total, self.status))
        self.db.conn.commit()

        orderId = self.db.cursor.fetchone()[0]
        self.id = orderId

        for i in self.items:
            orderItem = OrderedItemModel(
                order=orderId,
                item=i['id'],
                quantity=i['quantity'])
            orderItem.save()


    def update(self):
        q = """ 
        UPDATE orders SET userId = {},total = {},status = {}, updated_at = NOW() WHERE id = {} 
        """.format(self.userId, self.total, self.status, self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()

        orderItems = OrderedItemModel.find_all_order_items(self.id)

        for i in orderItems:
            for x in self.items:
                if i.id == x.id:
                    i.quantity = x.quantity
                    i.update()


    def json(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'items': [i.json() for i in self.items],
            'total': self.total,
            'status': self.status,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }


    @classmethod
    def get(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM orders WHERE id = %s
        """ % (_id)

        db.cursor.execute(q)
        db.conn.commit()

        result = db.cursor.fetchone()

        if bool(result):
            order = cls.get_object(result)
            order.items = OrderedItemModel.find_all_order_items(result[0])

            return order
        else:
            return None


    @classmethod
    def exists(cls, _id):
        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM orders WHERE id = {}
        """.format(_id)

        db.cursor.execute(q)
        db.conn.commit()

        db.cursor


    @classmethod
    def get_all_orders(cls):

        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM orders
            """

            db.cursor.execute(q)

            db.conn.commit()
            results = db.cursor.fetchall()

        except:
            return None

        response = []

        for result in results:
            order = cls.get_object(result)
            order.items = OrderedItemModel.find_all_order_items(result[0])

            response.append(order)

        return response

    @classmethod
    def get_all_orders_by_user(cls,userId):

        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM orders WHERE userId = {}
            """.format(userId)

            db.cursor.execute(q)

            db.conn.commit()
            results = db.cursor.fetchall()

        except:
            return None

        response = []

        for result in results:
            order = cls.get_object(result)
            order.items = OrderedItemModel.find_all_order_items(result[0])

            response.append(order)

        return response


    def save(self):
        if not bool(self.id):
            self.insert()
        else:
            self.update()
