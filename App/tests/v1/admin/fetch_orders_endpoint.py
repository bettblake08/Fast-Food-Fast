from App.tests.v1.test_config import test_client, init_database
import pytest
from flask import json


class TestFetchOrdersEndpoint(object):
    def login(self, test_client):
        response = test_client.post('api/v1/auth/login',
                                   data=json.dumps(
                                       {
                                           "username": "johndoe2",
                                           "password": "johndoe@A2"
                                       }),
                                   content_type="application/json")


        self.access_token = json.loads(response.data)['access_token']



    def test_fetch_orders(self, test_client, init_database):
        self.login(test_client)

        response = test_client.get('/api/v1/orders',
                                  headers={
                                      "Authorization": "Bearer " + self.access_token
                                  })


        assert response.status_code == 200
