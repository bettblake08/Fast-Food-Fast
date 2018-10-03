""" In this module contains the UserModel"""

from app.database import DB
from app.database.db_model import DBModel
from app.managers.serialization import flask_bcrypt


class UserModel(DBModel):
    """ This is the User model that manages all user accounts
    Attributes:
        table       :   Name of table
        role        :   Role id of the user. As follows:
                    +   1   Customer
                    +   2   Admin
    CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        username CHAR(60) NOT NULL,
        email CHAR(60) NOT NULL,
        password CHAR(120) NOT NULL,
        role INT NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ
    );
    """

    table = "users"

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
                        +   1   Customer
                        +   2   Admin
        Attributes:
            database_connection          :   An instance of the DB class
            username    :   Username as string
            email       :   Email address as string
            password    :   Hashed password as byte
            role        :   Role id of the user. As follows:
                        +   1   Customer
                        +   2   Admin
        """

        self.username = param['username']
        self.email = param['email']
        self.password = param['password']
        self.role = param['role'] if 'role' in param else 1

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
            password=row[3],
            role=row[4])

        user.id = row[0]
        user.created_at = str(row[5])
        user.updated_at = str(row[6])

        return user

    def insert(self):
        """ This is the row insert function to insert the class data into database.
        Attributes:
            id  : The id of the newly inserted row
        Returns:
            bool: Returns True is insert succeeded or False if it failed.
        """

        query = """
        INSERT INTO {}(username,email,password,role,created_at,updated_at) values(%s,%s,%s,%s,NOW(),NOW()) RETURNING id
        """.format(self.table)

        try:

            self.database_connection.cursor.execute(query, (
                self.username,
                self.email,
                self.password.decode('utf-8'),
                self.role))
            self.database_connection.db_connection.commit()

            self.id = self.database_connection.cursor.fetchone()[0]

            return True
        except:
            return False

    def update(self):
        """ This is the row update function used to update the data stored in the row
        """

        query = """
        UPDATE {} SET username = %s,email = %s,password = %s, updated_at = NOW() WHERE id = {} 
        """.format(self.table, self.id)

        self.database_connection.cursor.execute(
            query, (self.username, self.email, self.password))
        self.database_connection.db_connection.commit()

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

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = "SELECT * FROM {} WHERE id = %s ".format(cls.table)

        database_connection.cursor.execute(query, (_id))
        database_connection.db_connection.commit()

        result = database_connection.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)


    @classmethod
    def find_user_by_username(cls, username):
        """ This function is used to get a user using the username
        Args:
            username:    The username of the user as string
        Returns:
            UserModel if found or None if not found
        """

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = "SELECT * FROM {} WHERE username = '%s' ".format(cls.table) % username

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        result = database_connection.cursor.fetchall()

        if result:
            return cls.get_object(result[0])

    @classmethod
    def find_user_by_email(cls, email):
        """ This function is used to get a user using the email
        Args:
            email:    The email of the user as string
        Returns:
            UserModel if found or None if not found
        """

        database_connection = DB()
        database_connection.connect(cls.connection)

        query = "SELECT * FROM {} WHERE email = '%s' ".format(cls.table) % email

        database_connection.cursor.execute(query)
        database_connection.db_connection.commit()

        result = database_connection.cursor.fetchone()

        if bool(result):
            return cls.get_object(result)

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
