from App.Tests.v1.test_config import testClient
from flask import json
import pytest


@pytest.mark.run(order=1)
class TestPostNewFoodItemEndpoint(object):
    def placeOrder(self, data, testClient):
        return testClient.post('/api/v1/menu/',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_username_field(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "user": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_email_field(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "eml": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_password_field(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "passwd": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_incorrect_email_address(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrianocketmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 400

    def test_using_incorrect_password_field(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "m21c07ss"
                }
            ))

        assert response.status_code == 400

    def test_using_valid_data(self, testClient):

        response = self.placeOrder(
            testClient=testClient,
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
