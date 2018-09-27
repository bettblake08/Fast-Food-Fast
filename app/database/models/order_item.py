from app.database import DB
from app.database.db_model import DBModel


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
        """ This is the initialization function for the OrderItemModel

        Args:
            name   :   Name of the item
            price  :   Price of the item (100.00 * 100)
            c_id   :   Category id of the item. As follows:
                        +   1   Breakfast
                        +   2   Main
                        +   3   Snacks
                        +   4   Drinks
        
        Attributes:
            db     :   An instance of the DB class
            name   :   Name of the item
            price  :   Price of the item
            c_id   :   Category id
       
        """

        self.db = DB()
        self.db.connect(self.connection)

        self.name = param['name']
        self.price = param['price']
        self.c_id = param['c_id']


    @classmethod
    def get_object(cls, row):
        """ This is the function that converts the table row into OrderItemModel instance

        Args:
            row:    A table row of type tuple

        Returns:
            OrderItemModel

        
        """

        item = cls(
            name=row[1],
            price=row[2],
            c_id=row[3])

        item.id = row[0]
        item.created_at = row[4]
        item.updated_at = row[5]

        return item


    def insert(self):
        """ This is the row insert function to insert the class data into database. 
        
            Attributes:
                id  : The id of the newly inserted row

            Returns:
                bool: Returns True is insert succeeded or False if it failed.
        """
        

       
        try : 
            q = """ 
            INSERT INTO {}(name,price,c_id,created_at,updated_at) values(%s,%s,%s,NOW(),NOW()) RETURNING id
            """.format(self.table)

            self.db.cursor.execute(q, (self.name, self.price, self.c_id))
            self.db.conn.commit()

            self.id = self.db.cursor.fetchone()[0]


            return True
        except:
            return False


    def update(self):
        """ This is the row update function used to update the data stored in the row 
        
        """

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
        """ This function returns a JSON serializable dict containing item data
        
        """

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
        """ This function is used to get an order item using the id (primary key)

            Args:
                _id:    Id (primary key) of the item

            Returns:
                OrderItemModel if found or None if not found

        """

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
    def get_all_items(cls):
        """ This function is used to get all the order items stored in the database

            Returns:
                List (OrderItemModel) if found or None if not found

        """


        try:
            db = DB()
            db.connect(cls.connection)

            q = """ 
            SELECT * FROM %s
            """

            db.cursor.execute(q,(cls.table))

            db.conn.commit()
            results = db.cursor.fetchall()


            response = []

            for r in results:
                response.append(cls.get_object(r))

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
