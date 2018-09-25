import pytest
from App import create_app
from App.Database import DB
import os

app = create_app('TEST')

@pytest.fixture(scope="session")
def testClient():
    client = app.test_client()

    c = app.app_context()
    c.push()

    yield client

    c.pop()


@pytest.fixture(scope='session')
def initDatabase():
    os.environ.putenv('DB_ENV', "TEST")

    db = DB()
    db.init_test_db(app)

    yield db 

    db.teardown(app)