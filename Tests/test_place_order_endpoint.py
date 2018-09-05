from App.Resources.orders import Orders
from Tests.test_conf import testClient

class TestPlaceOrderEndpoint(object):
    def test_using_valid_data(self, testClient):
        response = testClient.post('/api/v1/orders', data=dict(
            userId=10000001,
            items=[{
                'id': 101,
                'quantity': 2
            }, {
                'id': 102,
                'quantity': 2
            }, {
                'id': 103,
                'quantity': 4
            }]
        ))
        assert response.status_code == 200

    def test_using_invalid_item_id(self, testClient):
        response = testClient.post('/api/v1/orders',data=dict(
            userId=10000001,
            items=[{
                'id':101,
                'quantity':2
            },{
                'id': 102,
                'quantity': 2
            },{
                'id': 105,
                'quantity': 4
            }]
        ))
        assert response.status_code == 200

    def test_using_invalid_user_id(self, testClient):
        response = testClient.post('/api/v1/orders',data=dict(
            userId=1000001,
            items=[{
                'id':101,
                'quantity':2
            },{
                'id': 102,
                'quantity': 2
            },{
                'id': 105,
                'quantity': 4
            }]
        ))
        assert response.status_code == 200
