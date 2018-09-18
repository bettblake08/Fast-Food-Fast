from App.Api.v1.Resources import Orders
from Tests.v1.test_config import testClient 
from flask import json

class TestFetchOrderEndpoint(object):
    def test_using_valid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/10001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_invalid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/20001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1