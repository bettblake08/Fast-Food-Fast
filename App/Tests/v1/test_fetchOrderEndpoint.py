from App.Api.v1.Resources import Orders
from App.Tests.v1.test_config import testClient 
from flask import json
import pytest


testNo = 5


@pytest.mark.run(order=2)
class TestFetchOrderEndpoint(object):
    def test_using_invalid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/ro')
        assert response.status_code == 400

    def test_using_unexisting_order_id(self, testClient):
        response = testClient.get('/api/v1/order/20001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1

    def test_using_valid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/10001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0