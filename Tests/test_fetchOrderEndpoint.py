from App.Resources.orders import Orders
from Tests.test_conf import testClient 
from flask import json

class TestFetchOrderEndpoint(object):
    def test_using_valid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/10001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0


    def test_using_invalid_order_id(self, testClient):
        response = testClient.get('/api/v1/order/20001')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1
