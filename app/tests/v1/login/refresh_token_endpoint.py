from app.tests.v1.test_config import test_client, init_database
from flask import json

class TestTokenRefreshEndpoint(object):
    def login(self, test_client):
        response = test_client.post('api/v1/auth/login',
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "johndoe@A2"
                }),
            content_type="application/json")


        self.refresh_token = json.loads(response.data)['refresh_token']

    def test_fetch_refreshed_token(self, test_client, init_database):
        self.login(test_client)

        response = test_client.get('/api/v1/token/refresh',
            headers={
                "Authorization": "Bearer " + self.refresh_token
            })

        data = json.loads(response.data)

        assert response.status_code == 201
        assert 'access_token' in data
