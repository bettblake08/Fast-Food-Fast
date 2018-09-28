from App.tests.v1.test_config import test_client ,init_database
from flask import json
import pytest


@pytest.mark.run(order=8)
class TestFetchOrderEndpoint(object):
    def login(self, test_client):
        response = test_client.post('api/v1/auth/login',
                                   data=json.dumps(
                                       {
                                           "username": "johndoe2",
                                           "password": "johndoe@A2"
                                       }),
                                   content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def fetchOrder(self,orderId,test_client):
        self.login(test_client)

        return test_client.get('/api/v1/order/' + str(orderId),
                    headers={
                        "Authorization": "Bearer " + self.access_token
                    }
                )

    def test_using_invalid_order_id(self, test_client, init_database):
        response = self.fetchOrder(
            orderId="ro",
            test_client = test_client
        )
        assert response.status_code == 400


    def test_using_incorrect_order_id(self, test_client, init_database):
        response = self.fetchOrder(
            orderId=20001,
            test_client = test_client
        )
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_valid_order_id(self, test_client, init_database):
        response = self.fetchOrder(
            orderId=1,
            test_client=test_client
        )
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
