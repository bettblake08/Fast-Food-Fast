import unittest
import os

from app import create_app
from app.database import DB
from app.database.factory import generate_test_data

app = create_app(os.getenv('APP_ENV'))

class APITestcase(unittest.TestCase):
    def setUp(self):
        self.test_client = app.test_client()
        self.database = DB()
        self.database.init_test_db(app)
        generate_test_data()

    def tearDown(self):
        self.database.teardown(app)