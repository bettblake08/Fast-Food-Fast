import psycopg2
from Database.schema import tables

class DB():
    def init_db(self,app):
        self.connect_db(app)
        
        db = self.conn

        for t in tables:
            self.cursor.execute(t)

        db.commit()

    def connect_db(self,app):
        connection = "dbname=" + app.config['DB_NAME']
        connection += " user=" + app.config['DB_USER']
        connection += " password=" + app.config['DB_PASSWORD']
        connection += " host=" + app.config['DB_HOST']

        self.conn = psycopg2.connect(connection)
        self.cursor = self.conn.cursor()

    def close_db(self):
        pass