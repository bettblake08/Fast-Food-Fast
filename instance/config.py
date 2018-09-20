class Config(object):
    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'
    DATABASE_URL = 'postgres://postgres:m21c07s96.A1@localhost:5432/fastfoodfast'

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
    TESTING = True

app_config = {
    "DEV": DevelopmentConfig,
    "PROD": ProductionConfig,
    "TEST": TestingConfig
}
