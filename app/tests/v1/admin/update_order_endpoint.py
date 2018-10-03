from app.tests.v1.test_config import APITestcase
from flask import json
import unittest


class TestUpdateOrderEndpoint(APITestcase):
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


    def updateOrder(self, id, data):
        self.login()

        return self.test_client.put(
            '/api/v1/order/' + str(id),
            data=data,
            content_type="application/json",
            headers={
                "Authorization": "Bearer " + self.access_token
            }
        )


    def test_using_invalid_order_id(self):
        
        response = self.updateOrder(
            id="ro",
            data=json.dumps(
            {
                "status": 1
            }))
  
        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Invalid order id . Please provide a valid status number.",
            "Unexpected response message!")


    def test_using_unexisting_order_id(self):
        
        response = self.updateOrder(
            id=20001,
            data=json.dumps(
                {
                    "status": 1
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            404,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Order not found. Please provide a valid order id.",
            "Unexpected response message!")


    def test_using_no_status_field(self):

        response = self.updateOrder(
            id=10001,
            data=json.dumps(
                {
                    "s": 1
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_invalid_status_no(self):

        response = self.updateOrder(
            id=1,
            data=json.dumps(
                {
                    "status": "ro"
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_incorrect_status_no(self):

        response = self.updateOrder(
            id=1,
            data=json.dumps(
                {
                    "status": 66
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Invalid status number. Please provide a valid status number.",
            "Unexpected response message!")


    def test_using_valid_data(self):
        
        response = self.updateOrder(
            id=1, 
            data=json.dumps(
                {
                    "status": 1
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            200,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "You have successfully updated the status of the order.",
            "Unexpected response message!")
