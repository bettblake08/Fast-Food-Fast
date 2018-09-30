
""" This module hosts the DB class used for managing the database connections
"""
import os
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

from app.database.schema import TABLES



class DB():
    """ This is the database class used to connect with the database
    """

    def __init__(self):
        """ This is the initialization function for the DB class
        Sets the env attribute of the class to the value stored in the DB_ENV environment
        """

        self.env = os.environ.get('DB_ENV')
        self.db_connection = None
        self.cursor = None

    def init_db(self, app):
        """ This is the database initialization function used to generate the
        database and corresponding tables
        """

        self.connect_db(app)
        self.create_tables()


    def init_test_db(self, app):
        """ This is the test database initialization function used to generate a test database
        and the corresponding tables
        """

        self.create_db(app)
        self.connect_db(app)
        self.create_tables()

    @classmethod
    def create_db(cls, app):
        """ This is the create table function.
        The connection string is generated by accessing the app configurations and getting the 
        database details required to establish a connection with it.
        Args:
            app:    An instance of the flask application
        """

        try:
            connection = " user=" + app.config['DB_USER']
            connection += " password=" + app.config['DB_PASSWORD']
            connection += " host=" + app.config['DB_HOST']

            db_connection = psycopg2.connect(connection)
            cursor = db_connection.cursor()

            db_connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
            cursor.execute("CREATE DATABASE " + app.config['DB_NAME'])

            print('Database {} created succeessfully.'.format(app.config['DB_NAME']))
        
        except:
            print('Failed to create to database.')

    def create_tables(self):
        """ This is the create tables function
        It takes the imported list of table scripts (tables) from the schema.py file, 
        and executes them to generate the tables
        """

        for table in TABLES:
            self.cursor.execute(table)

        self.db_connection.commit()

        try:
            print('Database tables created!')
        except:
            print('Failed to create all required tables.')

    def connect_db(self, app):
        """ This is the database connection function
        This function establises a connection to a database and stores it in this class's attribute.
        It gets the database connection details from the app configurations
        Attributes:
            db_connection:   This is the database connection that has been established
            cursor: This is the table cursor for the database
        """

        connection = "dbname=" + app.config['DB_NAME']
        connection += " user=" + app.config['DB_USER']
        connection += " password=" + app.config['DB_PASSWORD']
        connection += " host=" + app.config['DB_HOST']

        try:
            self.db_connection = psycopg2.connect(connection)
            self.cursor = self.db_connection.cursor()

            print('Connection to database {} succeeded.'.format(app.config['DB_NAME']))

            return self.db_connection.cursor()
        except:
            print('Failed to connect to database.')


    def connect(self, connection):
        """ This is the database connection function
        This function establises a connection to a database and stores it in this class's attribute.
        Args:
            connection: This holds the database connection url used to establish a connection 
            with the database
        Attributes:
            db_connection:   This is the database connection that has been established
            cursor: This is the table cursor for the database
        """

        try:
            self.db_connection = psycopg2.connect(connection)
            self.cursor = self.db_connection.cursor()

            print('Connection succeeded.')

            return self.db_connection.cursor()
        except:
            print('Failed to connect to database.')


    def teardown(self, app):
        """ This is the database teardown function
        This function removes all the tables found in the database
        Args:
            app: An instance of the flask application
        """

        self.connect_db(app)

        queries = [
            "DROP SCHEMA public CASCADE",
            "CREATE SCHEMA public"
        ]

        for query in queries:
            self.cursor.execute(query)

        self.db_connection.commit()
    
        try:
            print('Teardown succeeded!')
        except:
            print('Failed to teardown database. Please checkout code and try again!')


    def destroy(self, app):
        """ This is the database destroy function
        This function drops the database completely, erasing all the tables as well as 
        the database itself
        Args:
            app: An instance of the flask application
        """
        
        self.connect_db(app)
        self.cursor.execute("DROP DATABASE")
        self.db_connection.commit()

        try:
            print('Destroy db succeeded!')
        except:
            print('Failed to destroy database. Please checkout code and try again!')
