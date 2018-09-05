from App.Resources.orders import Orders
from Tests.test_conf import testClient 

class TestFetchOrdersEndpoint(object):
    def test(self, testClient):
        response = testClient.get('/api/v1/orders')
        assert response.status_code == 200
