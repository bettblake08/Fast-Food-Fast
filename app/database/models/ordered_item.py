from app.database import DB
from app.database.db_model import DBModel


class OrderedItemModel(DBModel):

    table_script = """ 
        CREATE TABLE IF NOT EXISTS ordered_items(
            id SERIAL PRIMARY KEY NOT NULL,
            orderId INT REFERENCES orders(id) NOT NULL,
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
            db          :   An instance of the DB class
            orderId     :   Order Id
            item        :   Item id
            quantity    :   The number of orders for the item

        """

        self.db = DB()
        self.db.connect(self.connection)

        self.orderId = param['order']
        self.item = param['item']
        self.quantity = param['quantity']


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
            q = """ 
            INSERT INTO {}(orderId,item,quantity) values({},{},{}) RETURNING id
            """.format(self.table,self.orderId, self.item, self.quantity)

            self.db.cursor.execute(q)
            self.db.conn.commit()

            self.id = self.db.cursor.fetchone()[0]

            return True
        except:
            return False


    def update(self):
        """ This is the row update function used to update the data stored in the row 
        
        """

        q = """ 
        UPDATE {} SET orderId = {},item = {},quantity = {} WHERE id = {} 
        """.format(self.table,self.orderId, self.item, self.quantity, self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()


    def json(self):
        """ This function returns a JSON serializable dict containing item data
        
        """

        return {
            'id': self.id,
            'order': self.orderId,
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

        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE id = {}
        """.format(cls.table,_id)

        db.cursor.execute(q)
        db.conn.commit()

        result = db.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)
        else:
            return None


    @classmethod
    def find_all_order_items(cls, orderId):
        """ This function is used to get all the ordered items for a specific order

            Args:
                orderId:    Order id/primary key

            Returns:
                List (OrderedItemModel) if found or None if not found

        """

        db = DB()
        db.connect(cls.connection)

        q = """ 
        SELECT * FROM {} WHERE orderId = {}
        """.format(cls.table,orderId)

        db.cursor.execute(q)
        db.conn.commit()

        results = db.cursor.fetchall()

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
