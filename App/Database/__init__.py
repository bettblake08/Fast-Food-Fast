import psycopg2
from App.Database.schema import tables
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

import os

users = [
    {
        'id': 10000001,
        'username': "bettbrian08",
        'password': 'Bett.A08'
    },
    {
        'id': 10000002,
        'username': "janet12",
        'password': 'Bett.A08'
    }, {
        'id': 10000003,
        'username': "miles27",
        'password': 'Bett.A08'
    }, {
        'id': 10000004,
        'username': "bigjames12",
        'password': 'Bett.A08'
    }
]

items = [
    {
        "id": 101,
        "name": "Chicken Burger",
        "price": 400
    },
    {
        "id": 102,
        "name": "Beef Burger",
        "price": 400
    },
    {
        "id": 103,
        "name": "Coke 350ml",
        "price": 100
    }
]


class DB():
    def __init__(self):
        self.env = os.environ.get('DB_ENV')

    def init_db(self, app):
        self.connect_db(app)
        self.create_tables()


    def init_test_db(self, app):
        self.create_db(app)
        self.connect_db(app)
        self.create_tables()


    def create_db(self, app):
        try:
            connection = " user=" + app.config['DB_USER']
            connection += " password=" + app.config['DB_PASSWORD']
            connection += " host=" + app.config['DB_HOST']

            conn = psycopg2.connect(connection)
            cursor = conn.cursor()

            conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cursor.execute("CREATE DATABASE " + app.config['DB_NAME'])

            print('Database {} created succeessfully.'.format(
                    app.config['DB_NAME']))
        
        except:
            print('Failed to connect to database.')


    def create_tables(self):
        db = self.conn

        for t in tables:
            self.cursor.execute(t)

        db.commit()

        try:
            print('Database tables created!')
        except:
            print('Failed to create all required tables.')


    def connect_db(self, app):
        connection = "dbname=" + app.config['DB_NAME']
        connection += " user=" + app.config['DB_USER']
        connection += " password=" + app.config['DB_PASSWORD']
        connection += " host=" + app.config['DB_HOST']

        try:
            self.conn = psycopg2.connect(connection)
            self.cursor = self.conn.cursor()

            print('Connection succeeded.')

            return self.conn.cursor()
        except:
            print('Failed to connect to database.')


    def connect(self, connection):
        try:
            self.conn = psycopg2.connect(connection)
            self.cursor = self.conn.cursor()

            print('Connection succeeded.')

            return self.conn.cursor()
        except:
            print('Failed to connect to database.')


    def destroy(self, app):
        self.connect_db(app)

        q = [
            "DROP SCHEMA public CASCADE",
            "CREATE SCHEMA public"
        ]

        for query in q:
            self.cursor.execute(query)

        self.conn.commit()

        try:
            print('Teardown succeeded!')
        except:
            print('Failed to teardown database. Please checkout code and try again!')