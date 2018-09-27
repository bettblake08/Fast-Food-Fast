import pytest
from App import create_app
from App.Database import DB
import os

app = create_app('TEST')

def pytest_namespace():
    return {
        "access_token":"",
        "refresh_token":""
    }


@pytest.fixture(scope="session")
def testClient():
    client = app.test_client()

    c = app.app_context()
    c.push()

    yield client

    c.pop()


@pytest.fixture(scope='session')
def initDatabase():
    db = DB()
    db.init_test_db(app)

    yield db 

    #db.teardown(app)

data = {
    "access_token":None,
    "refresh_token":None
}
