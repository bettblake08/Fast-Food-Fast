import os

class Config(object):    
    FLASK_APP = "run.py"

    JWT_TOKEN_LOCATION = ['headers'] 
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access']
    WEBPACK_MANIFEST_PATH = "../manifest.json"

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
    SERVER_NAME = 'localhost:5000'
    BCRYPT_LOG_ROUNDS = 4

    DB_HOST = "localhost"
    DB_USER = "postgres"
    DB_PASSWORD = "m21c07s96.A1"

    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'
    JWT_SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'


class DevelopmentDebugConfig(DevelopmentConfig):
    DEBUG = True
    DB_NAME = "fastfoodfast"

class DevelopmentNoDebugConfig(DevelopmentConfig):
    DEBUG = False
    DB_NAME = "fastfoodfast"


class TestingConfig(DevelopmentConfig):
    TESTING = True
    DEBUG = True
    DB_NAME = "fastfoodfasttest"



app_config = {
    "DEV": DevelopmentDebugConfig,
    "DEV_NO_DEBUG": DevelopmentNoDebugConfig,
    "PROD": ProductionConfig,
    "TEST": TestingConfig,
    "DEFAULT": DevelopmentDebugConfig
}
