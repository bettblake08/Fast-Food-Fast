import pytest
from App import create_app
from App.Database import DB

app = create_app('TEST')

@pytest.fixture(scope="session")
def testClient():
    client = app.test_client()

    c = app.app_context()
    c.push()

    yield client

    c.pop()


@pytest.fixture(scope='session')
def init_database():
    db = DB()

    yield db 

    db.destroy(app)