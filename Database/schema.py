tables = [
    """ 
    CREATE TABLE IF NOT EXISTS users(
        id          INT         PRIMARY KEY NOT NULL,
        username    CHAR(30)    NOT NULL,
        email       CHAR(30)    NOT NULL,
        phone_no    INT,
        password    CHAR(120)   NOT NULL
    );
    """,
    """ 
    CREATE TABLE IF NOT EXISTS meals(
        id          INT         PRIMARY KEY NOT NULL,
        name        CHAR(30)    NOT NULL,
        c_id        INT,
        price       FLOAT       NOT NULL
    );
    """
]
