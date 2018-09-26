from App.Tests.v1.test_config import testClient
from flask import json
import pytest


@pytest.mark.run(order=3)
class TestFetchMenuEndpoint(object):
    def test_using_valid_order_id(self, testClient, initDatabase):
        response = testClient.get('/api/v1/menu')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
