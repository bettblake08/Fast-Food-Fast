from app.tests.v1.test_config import APITestcase
from flask import json

class TestPostNewFoodItemEndpoint(APITestcase):
    def login(self):
        response = self.test_client.post('api/v1/auth/login',
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "password": "johndoe@A2"
                }),
            content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def placeNewItem(self,data):
        self.login()

        return self.test_client.post('/api/v1/menu',
                    data=data,
                    content_type='application/json',
                    headers={
                        "Authorization": "Bearer " + self.access_token
                    })

    def test_using_no_name_field(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "na": "Beef Burger",
                    "price": 400,
                    "c_id": "1"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_no_price_field(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "pr": 400,
                    "c_id": "1"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_no_category_id_field(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "cateid": "1"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_invalid_price(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": "be",
                    "c_id": "1"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_invalid_category_id(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": "op"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_category_that_does_not_exist(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": 99
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'], 
            "Invalid category id. Please provide a valid category number.",
            "Unexpected response message!")


    def test_using_valid_data(self):

        response = self.placeNewItem(
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": "1"
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            201,
            "Unexpected response status!")

        self.assertEqual(
            data['message'], 
            "You have successfully created a new order!",
            "Unexpected response message!")
