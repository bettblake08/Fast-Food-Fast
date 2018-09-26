from App.Tests.v1.test_config import testClient,initDatabase
from flask import json
import pytest



@pytest.mark.run(order=6)
class TestPostNewAdminEndpoint(object):
    def addAdmin(self, data, testClient):
        return testClient.post('/api/v1/auth/signup',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "user": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role":2
                }
            ))

        assert response.status_code == 400

    def test_using_no_email_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "eml": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08@rocketmail.com",
                    "passwd":"testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 400

    def test_using_no_role_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "passwd": "testPASS.A1",
                    "rle": 2
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_email_address(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08ocketmail.com",
                    "password": "testPASS.A1", 
                    "role": 2
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_incorrect_password_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "m21c07ss",
                    "role": 2
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2


    def test_using_invalid_role_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 'ro'
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_role_field(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 5
                }
            ))

        assert response.status_code == 400


    def test_using_valid_data(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0


    def test_using_existing_email_address(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack0807",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 4


    def test_using_existing_username(self, testClient, initDatabase):

        response = self.addAdmin(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 3
