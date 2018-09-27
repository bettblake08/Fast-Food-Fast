from App.Tests.v1.test_config import testClient, initDatabase
from flask import json
import pytest


@pytest.mark.run(order=4)
class TestPlaceOrderEndpoint(object):
    def login(self, testClient):
        response = testClient.post('api/v1/auth/login',
                                   data=json.dumps(
                                       {
                                           "username": "johndoe1",
                                           "password": "johndoe@A1"
                                       }),
                                   content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']



    def placeOrder(self,data,testClient):
        self.login(testClient)

        return testClient.post('/api/v1/users/orders',
                               data=data,
                               content_type='application/json',
                               headers={
                                   "Authorization": "Bearer " + self.access_token
                               }
                            )


    def test_using_invalid_item_id(self, testClient, initDatabase):
        response = self.placeOrder(
            testClient = testClient,
            data=json.dumps(
            {
                "items": json.dumps(
                    [{
                        "id": 101,
                        "quantity": 2
                    }, {
                        "id": 2,
                        "quantity": 2
                    }, {
                        "id": 3,
                        "quantity": 4
                    }]
                )
            }
        ))

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 1


    def test_using_no_quantity_value_in_item(self, testClient, initDatabase):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "items": json.dumps(
                        [{
                            "id": 1,
                            "q": 2
                        }, {
                            "id": 2,
                            "quantity": 2
                        }, {
                            "id": 3,
                            "quantity": 4
                        }]
                    )
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 2


    def test_using_no_items_key(self, testClient, initDatabase):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "item": json.dumps(
                        [{
                            "id": 1,
                            "quantity": 2
                        }, {
                            "id": 2,
                            "quantity": 2
                        }, {
                            "id": 3,
                            "quantity": 4
                        }]
                    )
                }
            ))

        assert response.status_code == 400


    def test_using_valid_data(self, testClient, initDatabase):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps({
                "items": json.dumps(
                    [{
                        "id": 1,
                        "quantity": 2
                    }, {
                        "id": 2,
                        "quantity": 2
                    }, {
                        "id": 3,
                        "quantity": 4
                    }]
                )
            }))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
