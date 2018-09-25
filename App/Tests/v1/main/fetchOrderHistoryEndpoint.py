from App.Tests.v1.test_config import testClient
from flask import json
import pytest


<<<<<<< HEAD
@pytest.mark.run(order=4)
=======
@pytest.mark.run(order=7)
>>>>>>> ft-fetch-menu-endpoint-160753471
class TestFetchOrderHistoryEndpoint(object):
    def test_endpoint(self, testClient):
        response = testClient.get('/api/v1/users/orders/')
        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
