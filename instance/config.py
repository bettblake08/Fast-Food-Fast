import os

class Config(object):    
    FLASK_APP = "run.py"

    JWT_TOKEN_LOCATION = ['headers'] 
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access']
    WEBPACK_MANIFEST_PATH = "./mainfest.json"

    
class ProductionConfig(Config):
    ENV = "production"
    FLASK_ENV = "production"
    DEBUG = False
    SERVER_NAME = os.getenv('SERVER_NAME')

    DB_HOST = os.getenv('DB_HOST')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    DB_NAME = os.getenv('DB_NAME')

    SECRET_KEY = os.getenv('SECRET_KEY')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


class DevelopmentConfig(Config):
    ENV = "development"
    FLASK_ENV = "development"
    DEBUG = True
    SERVER_NAME = 'localhost.dev:5000'
    BCRYPT_LOG_ROUNDS = 4

    DB_HOST = "localhost"
    DB_USER = "postgres"
    DB_PASSWORD = "m21c07s96.A1"
    DB_NAME = "fastfoodfast"

    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'
    JWT_SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'


class TestingConfig(Config):
    ENV = "development"
    TESTING = True
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    SERVER_NAME = 'localhost.dev:5000'
    
    DB_HOST = "localhost"
    DB_USER = "postgres"
    DB_PASSWORD = "m21c07s96.A1"
    DB_NAME = "fastfoodfasttest"

    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'
    JWT_SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'


app_config = {
    "DEV": DevelopmentConfig,
    "PROD": ProductionConfig,
    "TEST": TestingConfig,
    "DEFAULT": DevelopmentConfig
}
