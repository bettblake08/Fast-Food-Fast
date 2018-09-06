from flask import json
print(json.dumps(
    {
        "items": [{
            "id": 101,
            "quantity": 2
        }, {
            "id": 102,
            "quantity": 2
        }, {
            "id": 103,
            "quantity": 4
        }]
    }
))
