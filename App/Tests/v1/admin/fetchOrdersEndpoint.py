from App.Tests.v1.test_config import testClient
import pytest

<<<<<<< HEAD:App/Tests/v1/admin/fetchOrdersEndpoint.py
=======


>>>>>>> ft-fetch-menu-endpoint-160753471:App/Tests/v1/main/fetchOrdersEndpoint.py
@pytest.mark.run(order=5)
class TestFetchOrdersEndpoint(object):
    def test(self, testClient):
        response = testClient.get('/api/v1/orders')
        assert response.status_code == 200
