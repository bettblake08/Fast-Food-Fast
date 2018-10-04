from app.tests.v1.test_config import APITestcase
from flask import json

class TestFetchOrderEndpoint(APITestcase):
    def login(self):
        response = self.test_client.post(
            'api/v1/auth/login',
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "johndoe@A2"
                }),
            content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def fetchOrder(self,order_id):
        self.login()

        return self.test_client.get(
            '/api/v1/order/' + str(order_id),
            headers={
                "Authorization": "Bearer " + self.access_token
            }
        )

    def test_using_invalid_order_id(self):
        response = self.fetchOrder(
            order_id="ro"
        )

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Invalid order id. Please input a valid id.",
            "Unexpected response message!")


    def test_using_unexisting_order_id(self):
        response = self.fetchOrder(
            order_id=20001
        )

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            404,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Order does not exist. Please enter an existing order id.",
            "Unexpected response message!")


    def test_using_valid_order_id(self):
        response = self.fetchOrder(
            order_id=1
        )

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            200,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Fetch order successful!",
            "Unexpected response message!")
