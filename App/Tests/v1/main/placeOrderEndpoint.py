from App.Tests.v1.test_config import testClient
from flask import json
import pytest


@pytest.mark.run(order=2)
class TestPlaceOrderEndpoint(object):
    def placeOrder(self,data,testClient):
        return testClient.post('/api/v1/orders',
                               data=data,
                               content_type='application/json'
                               )

    
    def test_using_invalid_item_id(self, testClient):
        response = self.placeOrder(
            testClient = testClient,
            data=json.dumps(
            {
                "items": json.dumps(
                    [{
                        "id": 101,
                        "quantity": 2
                    }, {
                        "id": 102,
                        "quantity": 2
                    }, {
                        "id": 105,
                        "quantity": 4
                    }]
                )
            }
        ))

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 1

    
    def test_using_no_quantity_value_in_item(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "items": json.dumps(
                        [{
                            "id": 101,
                            "q": 2
                        }, {
                            "id": 102,
                            "quantity": 2
                        }, {
                            "id": 103,
                            "quantity": 4
                        }]
                    )
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 2

    
    def test_using_no_items_key(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "item": json.dumps(
                        [{
                            "id": 101,
                            "quantity": 2
                        }, {
                            "id": 102,
                            "quantity": 2
                        }, {
                            "id": 105,
                            "quantity": 4
                        }]
                    )
                }
            ))

        assert response.status_code == 400

    
    def test_using_valid_data(self, testClient):
        
        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps({
                "items": json.dumps(
                    [{
                        "id": 101,
                        "quantity": 2
                    }, {
                        "id": 102,
                        "quantity": 2
                    }, {
                        "id": 103,
                        "quantity": 4
                    }]
                )
            }))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
