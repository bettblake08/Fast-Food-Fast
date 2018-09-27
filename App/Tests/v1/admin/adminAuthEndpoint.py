from App.Tests.v1.test_config import testClient, initDatabase, testData,access_token,refresh_token
from flask import json
import pytest


@pytest.mark.run(order=7)
class TestAdminAuthEndpoint(object):
    def authUser(self, data, testClient):
        return testClient.post('/api/v1/auth/login',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, testClient, initDatabase):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "userna": "jamesblack",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, testClient, initDatabase):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "passwd": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_incorrect_password_value(self, testClient, initDatabase):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "password": "m21c07ss"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2

    def test_using_username_that_doesnt_exist(self, testClient, initDatabase):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack0807",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1

    def test_using_email_that_doesnt_exist(self, testClient, initDatabase):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettblake07@hotmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1

    def test_using_username(self, testClient, initDatabase,testData):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "password": "testPASS.A1"
                }
            ))

        data = json.loads(response.data)

        pytest.access_token = data['access_token']
        pytest.refresh_token = data['refresh_token']

        assert response.status_code == 200
        assert data['error'] == 0

    def test_using_email_as_username(self, testClient, initDatabase,testData):

        response = self.authUser(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1"
                }
            ))

        data = json.loads(response.data)

        pytest.access_token = data['access_token']
        pytest.refresh_token = data['refresh_token']            

        assert response.status_code == 200
        assert data['error'] == 0
