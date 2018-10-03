from app.tests.v1.test_config import test_client
from flask import json

class TestFetchMenuEndpoint(object):
    def test_fetch_menu(self, test_client, init_database):
        response = test_client.get('/api/v1/menu')
        assert response.status_code == 200
