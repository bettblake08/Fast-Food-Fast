from App.Resources.orders import Orders
from Tests.test_conf import testClient 

class TestFetchOrderEndpoint(object):
    def test(self, testClient):
        response = testClient.get('/api/v1/order/10001')
        assert response.status_code == 200
