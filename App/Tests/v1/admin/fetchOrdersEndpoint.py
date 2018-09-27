from App.Tests.v1.test_config import testClient, initDatabase
import pytest
from flask import json



@pytest.mark.run(order=9)
class TestFetchOrdersEndpoint(object):
    def login(self, testClient):
        response = testClient.post('api/v1/auth/login',
                                   data=json.dumps(
                                       {
                                           "username": "johndoe2",
                                           "password": "johndoe@A2"
                                       }),
                                   content_type="application/json")


        self.access_token = json.loads(response.data)['access_token']



    def test_fetch_orders(self, testClient, initDatabase):
        self.login(testClient)

        response = testClient.get('/api/v1/orders',
                                  headers={
                                      "Authorization": "Bearer " + self.access_token
                                  })


        assert response.status_code == 200
