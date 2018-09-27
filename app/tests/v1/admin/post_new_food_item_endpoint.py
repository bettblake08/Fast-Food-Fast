from app.tests.v1.test_config import test_client, init_database
from flask import json
import pytest


@pytest.mark.run(order=10)
class TestPostNewFoodItemEndpoint(object):
    def placeNewItem(self, data, test_client):
        return test_client.post('/api/v1/menu',
                               data=data,
                               content_type='application/json'
                               )

    def test_using_no_name_field(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "na": "Beef Burger",
                    "price": 400,
                    "c_id": "1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_price_field(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "pr": 400,
                    "c_id": "1"
                }
            ))

        assert response.status_code == 400

    def test_using_no_category_id_field(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "cateid": "1"
                }
            ))

        assert response.status_code == 400

    def test_using_invalid_price(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": "be",
                    "c_id": "1"
                }
            ))

        assert response.status_code == 400

    def test_using_invalid_category_id(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": "op"
                }
            ))

        assert response.status_code == 400

    def test_using_category_that_does_not_exist(self, test_client, init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": 99
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_valid_data(self, test_client,init_database):

        response = self.placeNewItem(
            test_client=test_client,
            data=json.dumps(
                {
                    "name": "Beef Burger",
                    "price": 400,
                    "c_id": "1"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0
