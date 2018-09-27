from app.tests.v1.test_config import test_client
from flask import json
import pytest


@pytest.mark.run(order=3)
class TestFetchMenuEndpoint(object):
    def test_using_valid_order_id(self, test_client, init_database):
        response = test_client.get('/api/v1/menu')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
