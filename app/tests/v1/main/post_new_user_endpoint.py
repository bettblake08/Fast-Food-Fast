from app.tests.v1.test_config import APITestcase
from flask import json

import random
import string

class TestPostNewUserEndpoint(APITestcase):
    def addUser(self, data):
        return self.test_client.post(
            '/api/v1/auth/signup',
            data=data,
            content_type='application/json'
            )

    def test_using_no_username_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "user": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role":2
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_no_email_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "eml": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_no_password_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08@rocketmail.com",
                    "passwd":"testPASS.A1",
                    "role": 2
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_long_username(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(80)),
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Username length is loo long. Please input a username 60 chars or less.",
            "Unexpected response message!")


    def test_using_no_role_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "passwd": "testPASS.A1",
                    "rle": 2
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_incorrect_email_address(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username":"jamesblack",
                    "email":"jamesblack08ocketmail.com",
                    "password": "testPASS.A1", 
                    "role": 2
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Incorrect email. Please input a valid email string.",
            "Unexpected response message!")


        assert response.status_code == 400


    def test_using_incorrect_password_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "m21c07ss",
                    "role": 2
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Incorrect password. Please input a valid password string.",
            "Unexpected response message!")


    def test_using_invalid_role_field(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 'ro'
                }
            ))

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")


    def test_using_incorrect_role_id(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 5
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            400,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Incorrect role id. Please input correct role id.",
            "Unexpected response message!")


    def test_using_valid_admin_user_data(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack08",
                    "email": "jamesblack08@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            201,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Sign up successful. User has been created!",
            "Unexpected response message!")


    def test_using_valid_customer_user_data(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "bettbrian08",
                    "email": "bettbrian@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 1
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            201,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "Sign up successful. User has been created!",
            "Unexpected response message!")


    def test_using_existing_email_address(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "jamesblack0807",
                    "email": "johndoe2@hotmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            403,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "User already exists. Please use another email address.",
            "Unexpected response message!")


    def test_using_existing_username(self):

        response = self.addUser(
            data=json.dumps(
                {
                    "username": "johndoe2",
                    "email": "jamesblack@rocketmail.com",
                    "password": "testPASS.A1",
                    "role": 2
                }
            ))

        data = json.loads(response.data)

        self.assertEqual(
            response.status_code,
            403,
            "Unexpected response status!")

        self.assertEqual(
            data['message'],
            "User already exists. Please use another username.",
            "Unexpected response message!")
