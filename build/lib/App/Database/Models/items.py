from App.Database.db import DB
from App.Database.db_model import DBModel


class ItemModel(DBModel):

    """ 
    CREATE TABLE IF NOT EXISTS items(
        id          INT         PRIMARY KEY NOT NULL,
        name        CHAR(30)    NOT NULL,
        c_id        INT,
        price       FLOAT       NOT NULL,
        created_at  TIMESTAMPTZ,
        updated_at  TIMESTAMPTZ
    );
    """

    id = None

    def __init__(self,name,c_id, price):
        self.db = DB()
        self.db.connect(self.connection)
        
        self.name = name
        self.c_id = int(c_id)
        self.price = price
    
    def insert(self):
        q = """ 
        INSERT INTO meals(name,c_id,price) values({},{},{})
        """.format(self.name,self.c_id,self.price)

        self.db.cursor.execute(q)
        self.db.conn.commit()

    def update(self):
        q = """ 
        UPDATE meals SET name = {},c_id = {},prices = {} WHERE id = {} 
        """.format(self.name,self.c_id,self.price,self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()
        
    def exists(self):
        q = """ 
        SELECT * FROM meals WHERE id = {}
        """.format(self.id)

        self.db.cursor.execute(q)
        self.db.conn.commit()

        self.db.cursor

    def save(self):
        if not bool(self.id):
            self.insert()
        else : 
            self.update()
