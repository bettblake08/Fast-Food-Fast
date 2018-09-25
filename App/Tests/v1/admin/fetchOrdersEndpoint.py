from App.Api.v1.Resources import Orders
from App.Tests.v1.test_config import testClient
import pytest

@pytest.mark.run(order=5)
class TestFetchOrdersEndpoint(object):
    def test(self, testClient):
        response = testClient.get('/api/v1/orders')
        assert response.status_code == 200
