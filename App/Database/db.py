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
