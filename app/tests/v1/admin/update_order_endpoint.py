from app.tests.v1.test_config import test_client,init_database
from flask import json
import pytest


@pytest.mark.run(order=11)
class TestUpdateOrderEndpoint(object):
    def login(self,test_client):
        response = test_client.post('api/v1/auth/login',
                    data=json.dumps(
                        {
                            "username": "johndoe2",
                            "password": "johndoe@A2"
                        }), 
                    content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def updateOrder(self,id,data,test_client):
        self.login(test_client)

        return test_client.put('/api/v1/order/' + str(id),
                    data=data,
                    content_type="application/json",
                    headers={
                        "Authorization": "Bearer " + self.access_token
                    }
                )


    def test_using_invalid_order_id(self, test_client, init_database):
        
        response = self.updateOrder(
            id="ro",
            test_client=test_client,
            data=json.dumps(
            {
                "status": 1
            }))


        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2


    def test_using_unexisting_order_id(self, test_client, init_database):
        
        response = self.updateOrder(
            id=20001,
            test_client=test_client,
            data=json.dumps(
            {
                "status": 1
            }))


        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2



    def test_using_no_status_field(self, test_client, init_database):

        response = self.updateOrder(
            id=10001, 
            test_client=test_client,
            data=json.dumps(
                {
                    "s": 1
                }
            ))
            
        assert response.status_code == 400


    def test_using_invalid_status_no(self, test_client, init_database):

        response = self.updateOrder(
            id=10001, 
            test_client=test_client,
            data=json.dumps(
                {
                    "status": "ro"
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1



    def test_using_incorrect_status_no(self, test_client, init_database):

        response = self.updateOrder(
            id=10001,
            test_client=test_client,
            data=json.dumps(
                {
                    "status": 66
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1



    def test_using_valid_data(self, test_client, init_database):
        
        response = self.updateOrder(
            id=1, 
            test_client=test_client,
            data=json.dumps(
                {
                    "status": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0