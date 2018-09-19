import pytest
from App import create_app

@pytest.fixture(scope="session")
def testClient():
    app = create_app('DEV')
    app.config['TESTING'] = True
    client = app.test_client()

    return client