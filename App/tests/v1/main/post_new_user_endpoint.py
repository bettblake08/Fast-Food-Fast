from App.tests.v1.test_config import test_client,init_database
from flask import json
import pytest


class TestPostNewUserEndpoint(object):
    def post_new_user(self, data, test_client):
        return test_client.post('/api/v1/auth/signup',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "user": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role":1
                }
            ))

        assert response.status_code == 400

    def test_using_no_email_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "eml": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username":"bettbrian08",
                    "email":"bettbrian@rocketmail.com",
                    "passwd":"testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 400

    def test_using_no_role_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "passwd": "testPASS.A1",
                    "rle": 1
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_email_address(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username":"bettbrian08",
                    "email":"bettbrianocketmail.com",
                    "password": "testPASS.A1", 
                    "role": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_incorrect_password_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "m21c07ss",
                    "role": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2


    def test_using_invalid_role_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 'ro'
                }
            ))

        assert response.status_code == 400


    def test_using_incorrect_role_field(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 5
                }
            ))

        assert response.status_code == 400


    def test_using_valid_data(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0


    def test_using_existing_email_address(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe18",
                    "email": "johndoe1@hotmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 4


    def test_using_existing_username(self, test_client, init_database):

        response = self.post_new_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe1",
                    "email": "johndoe18@hotmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 3
