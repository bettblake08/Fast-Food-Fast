from App.tests.v1.test_config import test_client
from flask import json
import pytest


class TestFetchOrderHistoryEndpoint(object):
    def test_endpoint(self, test_client, init_database):
        response = test_client.get('/api/v1/users/orders/')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
