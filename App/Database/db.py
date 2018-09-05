users = [
    {
        'id':10000001,
        'username':"bettbrian08",
        'password':'Bett.A08'
    },
    {
        'id': 10000002,
        'username': "janet12",
        'password': 'Bett.A08'
    }, {
        'id': 10000003,
        'username': "miles27",
        'password': 'Bett.A08'
    }, {
        'id': 10000004,
        'username': "bigjames12",
        'password': 'Bett.A08'
    }
]


items = [
    {
        "id": 101,
        "name":"Chicken Burger",
        "price":400
    },
    {
        "id": 102,
        "name": "Beef Burger",
        "price": 400
    },
    {
        "id": 103,
        "name": "Coke 350ml",
        "price": 100
    }
]



""" 
Order Status Codes
0 - Unconfirmed
1 - Confirmed
2 - Denied
3 - Completed
"""

orders = [
    {
        "id":10001,
        "userId":10000001,
        "items":[
            {
                "id":101,
                "quantity":2
            },
             {
                "id":102,
                "quantity":2
            },
            {
                "id": 103,
                "quantity": 4
            },
        ],
        "total":2000,
        "status":0
    },
    {
        "id":10002,
        "userId": 10000001,
        "items":[
            {
                "id":101,
                "quantity":2
            },
             {
                "id":102,
                "quantity":2
            },
            {
                "id": 103,
                "quantity": 4
            },
        ],
        "total":2000,
        "status":2
    },
    {
        "id":10003,
        "userId": 10000002,
        "items":[
            {
                "id":101,
                "quantity":2
            },
             {
                "id":102,
                "quantity":2
            },
            {
                "id": 103,
                "quantity": 4
            },
        ],
        "total":2000,
        "status":3
    }
]
