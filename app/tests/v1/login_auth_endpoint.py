from app.tests.v1.test_config import test_client, init_database
from flask import json
import pytest


class TestLoginAuthEndpoint(object):
    def auth_user(self, data, test_client):
        return test_client.post('/api/v1/auth/login',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "userna": "jamesblack",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "passwd": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_incorrect_password_value(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "m21c07ss"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1

    def test_using_username_that_doesnt_exist(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "jamesblack0807",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2

    def test_using_email_that_doesnt_exist(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "bettblake07@hotmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2

    def test_using_customer_username(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe1",
                    "password": "johndoe@A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0

    def test_using_customer_email_as_username(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe1@hotmail.com",
                    "password": "johndoe@A1"
                }
            ))
            

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0


    def test_using_admin_customer_username(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "johndoe@A2"
                }
            ))

        data = json.loads(response.data)

        assert response.status_code == 200
        assert data['error'] == 0


    def test_using_admin_email_as_username(self, test_client, init_database):

        response = self.auth_user(
            test_client=test_client,
            data=json.dumps(
                {
                    "username": "johndoe2@hotmail.com",
                    "password": "johndoe@A2"
                }
            ))

        data = json.loads(response.data)

        assert response.status_code == 200
        assert data['error'] == 0
