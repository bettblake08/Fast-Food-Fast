""" This module hosts the RoleModel class used to blacklist access tokens """

from app.database import DB
from app.database.db_model import DBModel
import psycopg2

class RoleModel(DBModel):
    """ This is the roles model used to manage the roles
    Attributes:
        table  :   Name of the table
    CREATE TABLE IF NOT EXISTS roles(
        id SERIAL PRIMARY KEY NOT NULL,
        name CHAR(30) NOT NULL,
    );
    """

    table = "roles"

    id = None

    def __init__(self, name):
        """ This is the initialization function for the RoleModel
        Args:
            name   :   Role name
        Attributes:
            database_connection     :   An instance of the DB class
            name  :   Role string
        """

        self.name = name
        DBModel.__init__(self)

    @classmethod
    def get(cls,role_id):
        query = "SELECT * FROM {} WHERE id = {} ".format(
            cls.table,
            role_id)

        try:
            cls.database_connection.cursor.execute(query)
            cls.database_connection.db_connection.commit()
            result = cls.database_connection.cursor.fetchone()

            if bool(result):
                return RoleModel.get_object(result)

        except psycopg2.DatabaseError:
            return None

    @classmethod
    def get_by_role(cls,role):
        query = "SELECT * FROM {} WHERE name = '{}' ".format(
            cls.table,
            role)

        try:
            cls.database_connection.cursor.execute(query)
            cls.database_connection.db_connection.commit()
            result = cls.database_connection.cursor.fetchone()

            if bool(result):
                return RoleModel.get_object(result)

        except psycopg2.DatabaseError:
            return None


    @classmethod
    def get_object(cls,row):
        role = cls(row[1].rstrip())
        role.id = row[0]

        return role

    def insert(self):
        """ This is the row insert function to insert the class data into database.
        Returns:
            bool: Returns True is insert succeeded or False if it failed.
        """

        query = "INSERT INTO {}(name) values('%s') ".format(
            self.table) % (self.name)

        try:   
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()
            return True
        except psycopg2.DatabaseError:
            return False

    @classmethod
    def role_exists(cls, name):
        """ This function is used to check whether this role name is a valid role name
        Args:
            name   : Role string
        Returns:
            bool    :   True if found, False if not found
        """
        query = "SELECT * FROM {} WHERE name = '{}' ".format(
            cls.table,
            name)

        try:   
            cls.database_connection.cursor.execute(query)
            cls.database_connection.db_connection.commit()

            return bool(cls.database_connection.cursor.fetchone())

        except psycopg2.DatabaseError:
            return False