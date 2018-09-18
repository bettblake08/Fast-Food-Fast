class Config(object):
    SECRET_KEY = b'\x0c$V\x92\x1b1\x05xp@\xfa\xdc\x94\x87\xc4\x0f'

class ProductionConfig(Config):
    ENV = "production"
    FLASK_ENV = "production"
    DEBUG = False

class DevelopmentConfig(Config):
    ENV = "development"
    FLASK_ENV = "development"
    DEBUG = True

class TestingConfig(Config):
    TESTING = True

app_config = {
    "DEV": DevelopmentConfig,
    "PROD": ProductionConfig,
    "TEST": TestingConfig
}
