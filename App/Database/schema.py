tables = [
""" 
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    username CHAR(30) NOT NULL,
    email CHAR(30) NOT NULL,
    password CHAR(120) NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ 
);
""",
""" 
CREATE TABLE IF NOT EXISTS items(
    id SERIAL PRIMARY KEY NOT NULL,
    name CHAR(30) NOT NULL,
    c_id INT,
    price FLOAT NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ 
);
""",
""" 
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    userId INT NOT NULL,
    total INT NOT NULL,
    status INT NOT NULL,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ 
);
""",
""" 
CREATE TABLE IF NOT EXISTS ordered_items(
    id SERIAL PRIMARY KEY NOT NULL,
    orderId INT REFERENCES orders(id) NOT NULL,
    item INT NOT NULL,
    quantity INT NOT NULL
);
"""
]
