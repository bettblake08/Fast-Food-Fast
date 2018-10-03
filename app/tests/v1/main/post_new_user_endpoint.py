from app.tests.v1.test_config import test_client,init_database
from flask import json

class TestPostNewUserEndpoint(object):
    def addUser(self, data, test_client):
        return test_client.post('/api/v1/auth/signup',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "user": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role":2
                }
            ))

        assert response.status_code == 400

    def test_using_no_email_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "eml": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08@rocketmail.com",
                    "passwd":"testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 400

    def test_using_no_role_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "passwd": "testPASS.A1",
                    "rle": 2
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_email_address(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08ocketmail.com",
                    "password": "testPASS.A1", 
                    "role": 2
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_password_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "m21c07ss",
                    "role": 2
                }
            ))

        assert response.status_code == 400


    def test_using_invalid_role_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 'ro'
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_role_field(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 5
                }
            ))

        assert response.status_code == 400


    def test_using_valid_admin_user_data(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack08",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 201


    def test_using_valid_customer_user_data(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 201

    def test_using_existing_email_address(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack0807",
                    "email": "johndoe2@hotmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 403


    def test_using_existing_username(self, test_client, init_database):

        response = self.addUser(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "email": "jamesblack@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        assert response.status_code == 403
