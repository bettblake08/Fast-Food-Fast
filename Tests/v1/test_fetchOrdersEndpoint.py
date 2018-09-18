from App.Api.v1.Resources import Orders
from Tests.v1.test_config import testClient 

class TestFetchOrdersEndpoint(object):
    def test(self, testClient):
        response = testClient.get('/api/v1/orders')
        assert response.status_code == 200
