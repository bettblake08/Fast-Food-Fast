from app.tests.v1.test_config import test_client, init_database
from flask import json

class TestLogOutEndpoint(object):
    def login(self, test_client):
        response = test_client.post('api/v1/auth/login',
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "johndoe@A2"
                }),
            content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def test_log_out(self, test_client, init_database):
        self.login(test_client)

        response = test_client.get('/api/v1/auth/logout',
            headers={
                "Authorization": "Bearer " + self.access_token
            })

        data = json.loads(response.data)

        assert response.status_code == 200
        assert data['error'] == 0
