from App.Resources.orders import Orders
from Tests.test_conf import testClient 
from flask import json

class TestUpdateOrderEndpoint(object):
    def test_using_valid_order_id(self, testClient):
        response = testClient.put('/api/v1/order/10001',
                data=json.dumps(
                    {
                        "status":1
                    }
                ),
                content_type="application/json"
                )
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0


    def test_using_invalid_order_id(self, testClient):
        response = testClient.put('/api/v1/order/20001',
                data=json.dumps(
                {
                    "status": 1
                }
            ),
                content_type="application/json"
            )

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2


    def test_using_no_status_field(self, testClient):
        response = testClient.put('/api/v1/order/10001',
                data=json.dumps(
                {
                    "s": 1
                }
            ),
                content_type="application/json"
            )
            
        assert response.status_code == 400

    def test_using_invalid_status_no(self, testClient):
        response = testClient.put('/api/v1/order/10001',
                data=json.dumps(
                    {
                        "status": 66
                    }
                ),
                content_type="application/json"
                )
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1
