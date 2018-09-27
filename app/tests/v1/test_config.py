import pytest
from app import create_app
from app.database import DB
from app.database.factory import generate_test_data
import os

app = create_app('TEST')

def pytest_namespace():
    return {
        "access_token":"",
        "refresh_token":""
    }


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
