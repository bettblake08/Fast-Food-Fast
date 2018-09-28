""" This module hosts the OrderedItemModel  """

from app.database import DB
from app.database.db_model import DBModel


""" This is the OrderedItemModel

    Attributes:
        table   : Table name
"""


class OrderedItemModel(DBModel):

    """ 
        CREATE TABLE IF NOT EXISTS ordered_items(
            id SERIAL PRIMARY KEY NOT NULL,
            order_id INT REFERENCES orders(id) NOT NULL,
            item INT NOT NULL,
            quantity INT NOT NULL
        );
    """

    id = None

    table = "ordered_items"

    def __init__(self, **param):
        """ This is the initialization function for the OrderedItemModel

        Args:
            order       :   The id of the order
            item        :   The id of the item
            quantity    :   The number of orders for the item


        Attributes:
            database_connection          :   An instance of the DB class
            order_id     :   Order Id
            item        :   Item id
            quantity    :   The number of orders for the item

        """

        self.order_id = param['order']
        self.item = param['item']
        self.quantity = param['quantity']

        super().__init__()

    @classmethod
    def get_object(cls, row):
        """ This is the function that converts the table row into OrderItemModel instance

        Args:
            row:    A table row of type tuple

        Returns:
            OrderedItemModel

        """

        item = cls(
            order=row[1],
            item=row[2],
            quantity=row[3])

        item.id = row[0]

        return item

    def insert(self):
        """ This is the row insert function to insert the class data into database. 

            Attributes:
                id  : The id of the newly inserted row

            Returns:
                bool: Returns True is insert succeeded or False if it failed.
        """

        try:
            query = """ 
            INSERT INTO {}(order_id,item,quantity) values({},{},{}) RETURNING id
            """.format(self.table, self.order_id, self.item, self.quantity)

            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()

            self.id = self.database_connection.cursor.fetchone()[0]

            return True
        except:
            return False

    def update(self):
        """ This is the row update function used to update the data stored in the row 

        """

        query = """ 
        UPDATE {} SET order_id = {},item = {},quantity = {} WHERE id = {} 
        """.format(self.table, self.order_id, self.item, self.quantity, self.id)

        self.database_connection.cursor.execute(query)
        self.database_connection.db_connection.commit()

    def json(self):
        """ This function returns a JSON serializable dict containing item data

        """

        return {
            'id': self.id,
            'order': self.order_id,
            'item': self.item,
            'quantity': self.quantity
        }

    @classmethod
    def get(cls, _id):
        """ This function is used to get an ordered item using the id (primary key)

            Args:
                _id:    Id (primary key) of the item

            Returns:
                OrderedItemModel if found or None if not found

        """

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = """ 
        SELECT * FROM {} WHERE id = {}
        """.format(cls.table, _id)

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        result = database_connection.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)
        else:
            return None

    @classmethod
    def find_all_order_items(cls, order_id):
        """ This function is used to get all the ordered items for a specific order

            Args:
                order_id:    Order id/primary key

            Returns:
                List (OrderedItemModel) if found or None if not found

        """

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = """ 
        SELECT * FROM {} WHERE order_id = {}
        """.format(cls.table, order_id)

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        results = database_connection.cursor.fetchall()

        if len(results) > 0:
            response = []

            for result in results:
                response.append(cls.get_object(result))

            return response
        else:
            return None

    def save(self):
        """ This function is used to determine whether to insert or update data to the database
        """

        if not bool(self.id):
            self.insert()
        else:
            self.update()