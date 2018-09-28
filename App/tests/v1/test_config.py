import pytest
import os

from App import create_app
from App.database import DB
from App.database.factory import generate_test_data

app = create_app(os.getenv('APP_ENV'))

@pytest.fixture(scope="session")
def test_client():
    client = app.test_client()

    c = app.app_context()
    c.push()

    yield client

    c.pop()


@pytest.fixture(scope='session')
def init_database():
    db = DB()
    db.init_test_db(app)
    generate_test_data()

    yield db 

    db.teardown(app)
