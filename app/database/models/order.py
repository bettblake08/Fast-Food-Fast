""" This module hosts the Order model 

"""

from app.database import DB
from app.database.models import OrderedItemModel
from app.database.db_model import DBModel


class OrderModel(DBModel):

    """ 
    CREATE TABLE IF NOT EXISTS orders(
    id INT PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    total INT NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ 
    );
    """

    id = None
    created_at = None
    updated_at = None

    table = "orders"

    def __init__(self, **param):
        """ This is the initialization function for the OrderModel

        Attributes:
            database_connection  :   An instance of the DB class

        Args:
            user_id      :   User id of the user that ordered
            items       :   List of items being ordered
            total       :   The total price of the order
            status      :   Status id of the order. As follows:
                            +   1   New
                            +   2   Processing
                            +   3   Cancelled
                            +   4   Complete

        """

        self.user_id = param['user_id']
        self.items = param['items'] if 'items' in param else []
        self.total = param['total']
        self.status = param['status']

        DBModel.__init__(self)

    @classmethod
    def get_object(cls, row):
        """ This is the function that converts the table row into OrderModel instance

        Args:
            row:    A table row of type tuple

        Returns:
            OrderModel


        """

        user = cls(
            user_id=row[1],
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

        query = """ 
        INSERT INTO {}(user_id,total,status,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
        """.format(self.table) % (self.user_id, self.total, self.status)

        try:
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()

            orderId = self.database_connection.cursor.fetchone()[0]
            self.id = orderId

            for item in self.items:
                order_item = OrderedItemModel(
                    order=orderId,
                    item=item['id'],
                    quantity=item['quantity'])

                order_item.save()

            return True
        except:
            return False
            

    def update(self):
        """ This is the row update function used to update the data stored in the row 

        """

        query = """ 
        UPDATE {} SET user_id = {},total = {},status = {}, updated_at = NOW() WHERE id = {} 
        """.format(self.table, self.user_id, self.total, self.status, self.id)

        self.database_connection.cursor.execute(query)
        self.database_connection.db_connection.commit()

        orderItems = OrderedItemModel.find_all_order_items(self.id)

        for order_item in orderItems:
            for item in self.items:
                if order_item.id == item.id:
                    order_item.quantity = item.quantity
                    order_item.update()


    def json(self):
        """ This function returns a JSON serializable dict containing item data

        """

        items = None

        if self.items:
            items = [i.json() for i in self.items]
        else:
            items = []

        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': items,
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

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = """ 
        SELECT * FROM {} WHERE id = %s
        """.format(cls.table) % (_id)

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        result = database_connection.cursor.fetchone()

        if bool(result):
            order = cls.get_object(result)
            order.items = OrderedItemModel.find_all_order_items(result[0])

            return order


    @classmethod
    def get_all_orders(cls):
        """ This function is used to get all the orders stored in the database

            Returns:
                List (OrderModel) if found or None if not found

        """

        try:
            database_connection = DB()
            database_connection.connect(cls.connection)

            query = """ 
            SELECT * FROM {}
            """.format(cls.table)

            database_connection.cursor.execute(query)

            database_connection.db_connection.commit()
            results = database_connection.cursor.fetchall()

            response = []

            for result in results:
                order = cls.get_object(result)
                order.items = OrderedItemModel.find_all_order_items(result[0])

                response.append(order)

            return response

        except:
            return None


    @classmethod
    def get_all_orders_by_user(cls, user_id):
        """ This function is used to get all the orders done by a user using the username

            Args:
                user_id  :   The id of the user

            Returns:
                List (OrderModel) if found or None if not found

        """

        try:
            database_connection = DB()
            database_connection.connect(cls.connection)

            query = """ 
            SELECT * FROM {} WHERE user_id = {}
            """.format(cls.table, user_id)

            database_connection.cursor.execute(query)

            database_connection.db_connection.commit()
            results = database_connection.cursor.fetchall()

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
