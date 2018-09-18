from App.Resources.orders import Orders
from Tests.test_conf import testClient
from flask import json

class TestPlaceOrderEndpoint(object):
    def test_using_valid_data(self, testClient):
        response = testClient.post('/api/v1/orders', data=json.dumps({
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
        }),
            content_type='application/json'
            )

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0

    def test_using_invalid_item_id(self, testClient):
        response = testClient.post('/api/v1/orders',data=json.dumps(
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
        ),
            content_type='application/json'
            )

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 1

    def test_using_no_quantity_value_in_item(self, testClient):
        response = testClient.post('/api/v1/orders', data=json.dumps(
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
        ),
            content_type='application/json'
        )

        assert response.status_code == 200
        assert json.loads(response.data)["error"] == 2


    def test_using_no_items_key(self, testClient):
        response = testClient.post('/api/v1/orders', data=json.dumps(
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
        ),
            content_type='application/json'
        )

        assert response.status_code == 400
