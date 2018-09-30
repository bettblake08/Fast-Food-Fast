""" 
This is the store for all create table scripts.

tables: An array of create table scripts stored as strings
"""


TABLES = [
    """ CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        username CHAR(30) NOT NULL,
        email CHAR(30) NOT NULL,
        password TEXT NOT NULL,
        role INT NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ 
    );
    """,
    """ 
    CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        total INT NOT NULL,
        status INT NOT NULL,
        created_at TIMESTAMPTZ,
        updated_at TIMESTAMPTZ 
    );
    """,
    """ 
    CREATE TABLE IF NOT EXISTS ordered_items(
        id SERIAL PRIMARY KEY NOT NULL,
        order_id INT REFERENCES orders(id) NOT NULL,
        item INT NOT NULL,
        quantity INT NOT NULL
    );
    """,
    """ 
    CREATE TABLE IF NOT EXISTS expired_tokens(
    token CHAR(120) NOT NULL
    );
    """,
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
]
