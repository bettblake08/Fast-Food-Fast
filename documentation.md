FORMAT:1A

HOST: https://https://fast-food-fast-bb.herokuapp.com/api/v1/


#FAST FOOD API

This is a web api that implements the online restaurant business requirements set by the FastFoodFast restaurant. FastFoodFast is a restaurant thats serves fast food meals such as french fries, burgers, fried food, soda and much more. But to reach a larger market of customers that are not willing to visit their restaurant, they have decided to produce an online web platform for aspiring customers to make an order from their restaurant. 



# Group Authentication 

### Sign Up [POST /auth/signup]
This endpoint is used to register a new user to the platform. This user can be a customer or an admin, specified by the role id in the role field.
For a user to sign up, the request body should contain:

    +   username:   It should of string type and less than or equal to 30
    +   email:      It should be a valid email address and less than or equal to 30
    +   password:   It should contain at least 1 upper case, 1 lowercase, 1 digit and 1 special character [@$#.]. Password length should be 8-16                  characters
    +   role:       It should be either 1 (customer) or 2 (administrator)

Specifying the role enables the platform to know what type of account is being created.


+   Request 

        +   Headers
            Content-Type    :   application/json


        +   Body
            {
                "username": "johndoe1",
                "email": "johndoe1@rocketmail.com",
                "password": "testPASS.A1",
                "role": 1
            }

+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }



### Log In [POST /auth/login]
This endpoint is used to login a user to the platform. This user can be a customer or an admin. Each username and email is unique, so a role id is not required to identify the role of the user.

For a user to login, the following fields need to be present in the request body:
    +   username:   It can be one of the following

        +   username:   It should of string type and less than or equal to 30
        +   email:      It should be a valid email address and less than or equal to 30
    
    +   password:   It should contain at least 1 upper case, 1 lowercase, 1 digit and 1 special character [@$#.]. Password length should be 8-16                  characters

+   Request 

        +   Headers
            Content-Type    :   application/json


        +   Body
            {
                "username": "johndoe1",
                "password": "johndoe@A1"
            }

+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }


### Log Out [POST /auth/logout]
This endpoint is used to logout a user to the platform. This user can be a customer or an admin.

This endpoint can only be accessed if a user has already been logged in.


+   Request 

        +   Headers
            Content-Type    :   application/json
            Authorization   :   Bearer <access_token>

+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }



# Group Orders

## User Orders Collection [/users/orders]

### Place an order [POST]
This endpoint is used to place an order to the platform. To do so, a list of items need to be posted to the endpoint, with each item containing:
    +   id:         An item id of the item the user wants to order
    +   quantity:   The number of orders of the item the user wishes to make

This endpoint is restricted to the customer user hence it is required that a customer user be logged in before accessing this endpoint. 


+   Request 

        +   Headers
            Content-Type    :   application/json
            Authorization   :   Bearer <access_token>


        +   Body
            {
                "items": [
                    {
                        "id": 1,
                        "quantity": 2
                    }, {
                        "id": 2,
                        "quantity": 2
                    }, {
                        "id": 3,
                        "quantity": 4
                    }
                ]
            }


+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }



### Get order history [GET]
This endpoint is used to get the order history for a particular user.

This endpoint is restricted to the customer user hence it is required that a customer user be logged in before accessing this endpoint. 


+   Request 

        +   Headers
            Authorization   :   Bearer <access_token>


+   Response   200 ('application/json')

        +   Body
            {
                'error':0,
                'content':[
                    {
                        'id':1,
                        'userId':1,
                        'items': [
                            {
                                'id': 1,
                                'order': 1,
                                'item': 1,
                                'quantity': 2
                            }
                        ],
                        'total': 10000,
                        'status': 1,
                        'created_at': '2016-11-06 00:00:00-07',
                        'updated_at': '2016-11-06 00:00:00-07'
                    }
                ]
            }





##  Orders Collection [/orders]

### Get all the orders [GET]
This endpoint is used to get all the orders in the platform. 

This endpoint is restricted to the admin user hence it is required that an admin user be logged in before accessing this endpoint. 


+   Request 

        +   Headers
            Authorization   :   Bearer <access_token>


+   Response   200 ('application/json')

        +   Body
            {
                'error':0,
                'content':[
                    {
                        'id':1,
                        'userId':1,
                        'items': [
                            {
                                'id': 1,
                                'order': 1,
                                'item': 1,
                                'quantity': 2
                            }
                        ],
                        'total': 10000,
                        'status': 1,
                        'created_at': '2016-11-06 00:00:00-07',
                        'updated_at': '2016-11-06 00:00:00-07'
                    }
                ]
            }



## Order Collection [/orders/{orderId}]

### Get a specific order [GET]
This endpoint is used to get a specific order from the platform.

This endpoint is restricted to the admin user hence it is required that an admin user be logged in before accessing this endpoint. 


+   Parameters
        +   orderId (number)    -   The id of the order


+   Request 

        +   Headers
            Content-Type    :   application/json
            Authorization   :   Bearer <access_token>


+   Response   200 ('application/json')

        +   Body
            {
                'error':0,
                'content':{
                    'id':1,
                    'userId':1,
                    'items': [
                        {
                            'id': 1,
                            'order': 1,
                            'item': 1,
                            'quantity': 2
                        }
                    ],
                    'total': 10000,
                    'status': 1,
                    'created_at': '2016-11-06 00:00:00-07',
                    'updated_at': '2016-11-06 00:00:00-07'
                }
            }


### Update the order status [PUT]
This endpoint is used to update the status of an order from the platform. Status ids and their corresponding meanings are as follows
    +   1   New
    +   2   Processing
    +   3   Cancelled
    +   4   Complete

This endpoint is restricted to the admin user hence it is required that an admin user be logged in before accessing this endpoint. 


+   Parameter
        +   orderId (number)    - The id of the order


+   Request 

        +   Headers
            Content-Type    :   application/json
            Authorization   :   Bearer <access_token>


+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }



#Group Menu

## Menu Collection  [/menu]

### Get the menu of order item [GET]
GET /menu
Get available menu

This endpoint is used to get a list of order items from the platform in order to make an order. 

+   Request 

        +   Headers
            Content-Type    :   application/json


+   Response   200 ('application/json')

        +   Body
            {
                'error':0
            }




### Post a new order item[POST]
This endpoint is used to post a new order item/meal to the platform. It is required to specify the category of the item. Category ids and their corresponding meanings are as follows:
    +   1   Breakfast
    +   2   Main
    +   3   Snacks
    +   4   Drinks

This endpoint is restricted to the admin user hence it is required that an admin user be logged in before accessing this endpoint. 


+   Request 

        +   Headers
            Content-Type    :   application/json
            Authorization   :   Bearer <access_token>

        +   Body
            {
                'name': "Beef Burger",
                'price': 400.00,
                'c_id': 1,
            }

    

+   Response   200 ('application/json')

        +   Body
                {
                    'error': 0
                }