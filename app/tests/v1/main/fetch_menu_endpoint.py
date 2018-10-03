from app.tests.v1.test_config import APITestcase
from flask import json
import unittest

class TestFetchMenuEndpoint(APITestcase):
    def test_fetch_menu(self):
        response = self.test_client.get('/api/v1/menu')
        
        self.assertEqual(
            response.status_code,
            200,
            "Unexpected response status!")
