""" In this module contains the UserModel"""

from app.database import DB
from app.database.db_model import DBModel
from app.managers.serialization import flask_bcrypt
from app.database.models.role import RoleModel

import psycopg2

class UserModel(DBModel):
    """ This is the User model that manages all user accounts
    Attributes:
        table       :   Name of table
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        username CHAR(60) NOT NULL,
        email CHAR(60) NOT NULL,
        password CHAR(120) NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ
    );
    CREATE TABLE IF NOT EXISTS user_roles(
        id SERIAL PRIMARY KEY NOT NULL,
        user REFERENCES users(id) NOT NULL,
        role INT REFERENCES roles(id) NOT NULL,
    )
    """

    table = "users"
    table_roles = "user_roles"

    id = None
    created_at = None
    updated_at = None

    def __init__(self, **param):
        """ This is the initialization function for the OrderItemModel
        Args:
            username    :   Username as string
            email       :   Email address as string
            password    :   Hashed password as byte
            role        :   Role id of the user. As follows:
                        +   Customer
                        +   Admin
        Attributes:
            database_connection          :   An instance of the DB class
            username    :   Username as string
            email       :   Email address as string
            password    :   Hashed password as byte
            role        :   Role id of the user. As follows:
                        +   Customer
                        +   Admin
        """

        self.username = param['username']
        self.email = param['email']
        self.password = param['password']
        self.role = param['role'] if 'role' in param else None

        DBModel.__init__(self)

    @classmethod
    def get_object(cls, row):
        """ This is the function that converts the table row into UserModel instance
        Args:
            row:    A table row of type tuple
        Returns:
            UserModel
        """

        user = cls(
            username=row[1].rstrip(),
            email=row[2],
            password=row[3])

        user.id = row[0]
        user.created_at = str(row[4])
        user.updated_at = str(row[5])

        user.get_role()

        return user

    def insert(self):
        """ This is the row insert function to insert the class data into database.
        Attributes:
            id  : The id of the newly inserted row
        Returns:
            bool: Returns True is insert succeeded or False if it failed.
        """

        query = """
        INSERT INTO {}(username,email,password,created_at,updated_at) values('%s','%s','%s',NOW(),NOW()) RETURNING id
        """.format(self.table) % (
                self.username,
                self.email,
                self.password.decode('utf-8'))

        try:
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()
            self.id = self.database_connection.cursor.fetchone()[0]

        except psycopg2.DatabaseError:
            return False
        

        role = RoleModel.get_by_role(self.role)
        query = "INSERT INTO {}(user_id,role_id) values(%s,%s) ".format(self.table_roles) % (self.id, role.id)
        
        try:
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()
            
        except psycopg2.DatabaseError:
            return False 


    def update(self):
        """ This is the row update function used to update the data stored in the row
        """

        query = """
        UPDATE {} SET username = '%s',email = '%s',password = '%s', updated_at = NOW() WHERE id = {} 
        """.format(self.table, self.id) % (self.username, self.email, self.password)

        try:    
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()

        except psycopg2.DatabaseError:
            return False

    def json(self):
        """ This function returns a JSON serializable dict containing item data
        """

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'role': self.role,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at)
        }

    @classmethod
    def get(cls, _id):
        """ This function is used to get a user using the id (primary key)
        Args:
            _id:    Id (primary key) of the user
        Returns:
            UserModel if found or None if not found
        """
        query = "SELECT * FROM {} WHERE id = %s ".format(cls.table)

        try:
            cls.database_connection.cursor.execute(query, (_id))
            cls.database_connection.db_connection.commit()

            result = cls.database_connection.cursor.fetchone()

            if bool(result):
                return cls.get_object(result)
        except:
            return None


    @classmethod
    def find_user_by_username(cls, username):
        """ This function is used to get a user using the username
        Args:
            username:    The username of the user as string
        Returns:
            UserModel if found or None if not found
        """
        query = "SELECT * FROM {} WHERE username = '%s' ".format(cls.table) % username

        try:
            cls.database_connection.cursor.execute(query)
            cls.database_connection.db_connection.commit()

            result = cls.database_connection.cursor.fetchall()

            if result:
                return cls.get_object(result[0])
        except psycopg2.DatabaseError:
            return None

    @classmethod
    def find_user_by_email(cls, email):
        """ This function is used to get a user using the email
        Args:
            email:    The email of the user as string
        Returns:
            UserModel if found or None if not found
        """
        query = "SELECT * FROM {} WHERE email = '%s' ".format(cls.table) % email

        try:
            cls.database_connection.cursor.execute(query)
            cls.database_connection.db_connection.commit()

            result = cls.database_connection.cursor.fetchone()

            if bool(result):
                return cls.get_object(result)

        except psycopg2.DatabaseError:
            return None


    def get_role(self):
        """ This function is used to get the role of a user

        Returns:
            RoleModel if found or None if not found
        """
        query = "SELECT R.* FROM {} as UR, roles as R WHERE UR.user_id = %s AND R.id = UR.role_id".format(
            self.table_roles) % self.id

        try:
            self.database_connection.cursor.execute(query)
            self.database_connection.db_connection.commit()

            result = self.database_connection.cursor.fetchone()
            self.role = result[1].strip()

            if result:
                return RoleModel.get_object(result)

        except psycopg2.DatabaseError:
            return None

    def authenticate(self, password):
        """ This function is used to authenticate the password against the stored hash password
        This is done to authenticate the user attempting to log into the system
        Args:
            password:    The password attempt of the user as a string
        Returns:
            bool: True if passwords match or False if not
        """

        return flask_bcrypt.check_password_hash(self.password, password)

    def save(self):
        """ This function is used to determine whether to insert or update data to the database
        """

        if not bool(self.id):
            self.insert()
        else:
            self.update()
