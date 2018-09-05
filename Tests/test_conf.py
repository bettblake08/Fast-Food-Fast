import os
import pytest
from App.app import app

@pytest.fixture(scope="session")
def testClient():
    app.config['TESTING'] = True
    client = app.test_client()

    return client
