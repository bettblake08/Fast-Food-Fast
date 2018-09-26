class Config(object):
    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'
    DATABASE_URL = 'postgres://postgres:m21c07s96.A1@localhost:5432/fastfoodfast'
    SERVER_NAME = 'localhost.dev:5000'

    JWT_TOKEN_LOCATION = ['cookies']
    JWT_COOKIE_SECURE = True
    JWT_ACCESS_COOKIE_PATH = '/'
    JWT_REFRESH_COOKIE_PATH = '/api/key2/'
    JWT_COOKIE_CSRF_PROTECT = False
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    JWT_SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'



class ProductionConfig(Config):
    ENV = "production"
    FLASK_ENV = "production"
    DEBUG = False


class DevelopmentConfig(Config):
    ENV = "development"
    FLASK_ENV = "development"
    DEBUG = True

    DB_HOST = "localhost"
    DB_USER = "postgres"
    DB_PASSWORD = "m21c07s96.A1"
    DB_NAME = "fastfoodfast"


class TestingConfig(Config):
    ENV = "development"
    TESTING = True
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4
    
    DB_HOST = "localhost"
    DB_USER = "postgres"
    DB_PASSWORD = "m21c07s96.A1"
    DB_NAME = "fastfoodfasttest"

app_config = {
    "DEV": DevelopmentConfig,
    "PROD": ProductionConfig,
    "TEST": TestingConfig
}
