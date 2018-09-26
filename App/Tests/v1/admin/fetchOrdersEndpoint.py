from App.Tests.v1.test_config import testClient, initDatabase
import pytest



@pytest.mark.run(order=9)
class TestFetchOrdersEndpoint(object):
    def test(self, testClient, initDatabase):
        response = testClient.get('/api/v1/orders')
        assert response.status_code == 200
