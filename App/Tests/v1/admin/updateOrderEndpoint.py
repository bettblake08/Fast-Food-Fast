from App.Tests.v1.test_config import testClient,initDatabase
from flask import json
import pytest


@pytest.mark.run(order=11)
class TestUpdateOrderEndpoint(object):
    def login(self,testClient):
        response = testClient.post('api/v1/auth/login',
                    data=json.dumps(
                        {
                            "username": "johndoe2",
                            "password": "johndoe@A2"
                        }), 
                    content_type="application/json")

        self.access_token = json.loads(response.data)['access_token']


    def updateOrder(self,id,data,testClient):
        self.login(testClient)

        return testClient.put('/api/v1/order/' + str(id),
                    data=data,
                    content_type="application/json",
                    headers={
                        "Authorization": "Bearer " + self.access_token
                    }
                )


    def test_using_invalid_order_id(self, testClient, initDatabase):
        
        response = self.updateOrder(
            id=20001,
            testClient=testClient,
            data=json.dumps(
            {
                "status": 1
            }))


        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 2


    def test_using_no_status_field(self, testClient, initDatabase):

        response = self.updateOrder(
            id=10001, 
            testClient=testClient,
            data=json.dumps(
                {
                    "s": 1
                }
            ))
            
        assert response.status_code == 400


    def test_using_invalid_status_no(self, testClient, initDatabase):

        response = self.updateOrder(
            id=10001, 
            testClient=testClient,
            data=json.dumps(
                {
                    "status": 66
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 1


    def test_using_valid_data(self, testClient, initDatabase):
        
        response = self.updateOrder(
            id=1, 
            testClient=testClient,
            data=json.dumps(
                {
                    "status": 1
                }
            ))

        assert response.status_code == 200
        assert json.loads(response.data)['error'] == 0