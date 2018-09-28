from App.tests.v1.test_config import test_client, init_database
from flask import json
import pytest


class TestPlaceOrderEndpoint(object):
    def login(self, test_client):
        response = test_client.post('api/v1/auth/login',
                                   data=json.dumps(
                                       {
                                           "username": "johndoe1",
                                           "password": "johndoe@A1"
                                       }),
                                   content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']



    def place_order(self,data,test_client):
        self.login(test_client)

        return test_client.post('/api/v1/users/orders',
                               data=data,
                               content_type='application/json',
                               headers={
                                   "Authorization": "Bearer " + self.access_token
                               }
                            )


    def test_using_invalid_item_id(self, test_client, init_database):
        response = self.place_order(
            test_client = test_client,
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


    def test_using_no_quantity_value_in_item(self, test_client, init_database):

        response = self.place_order(
            test_client=test_client,
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


    def test_using_no_items_key(self, test_client, init_database):

        response = self.place_order(
            test_client=test_client,
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


    def test_using_valid_data(self, test_client, init_database):

        response = self.place_order(
            test_client=test_client,
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
