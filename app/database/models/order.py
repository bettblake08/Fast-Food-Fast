from app.database import DB
from app.database.models import OrderedItemModel
from app.database.db_model import DBModel


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
        """ This is the initialization function for the OrderModel

        Attributes:
            db  :   An instance of the DB class

        Args:
            userId      :   User id of the user that ordered
            items       :   List of items being ordered
            total       :   The total price of the order
            status      :   Status id of the order. As follows:
                            +   1   New
                            +   2   Processing
                            +   3   Cancelled
                            +   4   Complete
            
        """

        self.db = DB()
        self.db.connect(self.connection)

        self.userId = param['userId']
        self.items = param['items'] if 'items' in param else []
        self.total = param['total']
        self.status = param['status']


    @classmethod
    def get_object(cls,row):
        """ This is the function that converts the table row into OrderModel instance

        Args:
            row:    A table row of type tuple

        Returns:
            OrderModel

        
        """

        user = cls(
            userId=row[1],
            total=row[2],
            status=row[3])

        user.id = row[0]
        user.created_at = str(row[4])
        user.updated_at = str(row[5])

        return user


    def insert(self):
        """ This is the row insert function to insert the class data into database. 
        
            Attributes:
                id  : The id of the newly inserted row

            Returns:
                bool: Returns True is insert succeeded or False if it failed.
        """
    

        q = """ 
        INSERT INTO orders(userId,total,status,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
        """

        try:
            self.db.cursor.execute(q, (self.userId, self.total, self.status))
            self.db.conn.commit()

            orderId = self.db.cursor.fetchone()[0]
            self.id = orderId

            for item in self.items:
                orderItem = OrderedItemModel(
                    order=orderId,
                    item=item['id'],
                    quantity=item['quantity'])

                orderItem.save()

            return True
        except:
            return False


    def update(self):
        """ This is the row update function used to update the data stored in the row 
        
        """


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
        """ This function returns a JSON serializable dict containing item data
        
        """

        items = None

        if self.items:
            items = [i.json() for i in self.items]
        else :
            items = []

        return {
            'id': self.id,
            'userId': self.userId,
            'items': items ,
            'total': self.total,
            'status': self.status,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }


    @classmethod
    def get(cls, _id):
        """ This function is used to get an order item using the id (primary key)

            Args:
                _id:    Id (primary key) of the item

            Returns:
                OrderModel if found or None if not found

        """

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
    def get_all_orders(cls):
        """ This function is used to get all the orders stored in the database

            Returns:
                List (OrderModel) if found or None if not found

        """


        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM orders
            """

            db.cursor.execute(q)

            db.conn.commit()
            results = db.cursor.fetchall()

            response = []

            for result in results:
                order = cls.get_object(result)
                order.items = OrderedItemModel.find_all_order_items(result[0])

                response.append(order)

            return response

        except:
            return None

       
    @classmethod
    def get_all_orders_by_user(cls,userId):
        """ This function is used to get all the orders done by a user using the username

            Args:
                userId  :   The id of the user

            Returns:
                List (OrderModel) if found or None if not found

        """

        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM orders WHERE userId = {}
            """.format(userId)

            db.cursor.execute(q)

            db.conn.commit()
            results = db.cursor.fetchall()

            response = []

            for result in results:
                order = cls.get_object(result)
                order.items = OrderedItemModel.find_all_order_items(result[0])

                response.append(order)

            return response
            
        except:
            return None

    

    def save(self):
        """ This function is used to determine whether to insert or update data to the database
        """
        
        if not bool(self.id):
            self.insert()
        else:
            self.update()
