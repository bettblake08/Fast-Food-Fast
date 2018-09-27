from App.Database.Models import OrderModel, OrderItemModel, UserModel, RevokedTokenModel
from App.Managers.Serialization import flask_bcrypt

def generate_test_data():
    """ 
    Generates test data to be used when running tests
    """
    
    user = UserModel(
        username="johndoe1",
        email="johndoe1@hotmail.com",
        password=flask_bcrypt.generate_password_hash("johndoe@A1"),
        role=1)

    user.save()

    admin = UserModel(
        username="johndoe2",
        email="johndoe2@hotmail.com",
        password=flask_bcrypt.generate_password_hash("johndoe@A2"),
        role=2)

    admin.save()

    orderItems = [
        OrderItemModel(
            name="English Breakfast",
            price=600 * 100,
            c_id=2),
        OrderItemModel(
            name="Chicken Burger",
            price=400 * 100,
            c_id=2),
        OrderItemModel(
            name="Coke 350 ml",
            price=100 * 100,
            c_id=4),
    ]

    for item in orderItems:
        item.insert()

    orders = [
        OrderModel(
            userId=user.id,
            items=[
                {
                    'id': 2,
                    'quantity': 2
                },
                {
                    'id': 3,
                    'quantity': 2
                }
            ],
            total=100000,
            status=0),
        OrderModel(
            userId=user.id,
            items=[
                {
                    'id': 1,
                    'quantity': 3
                }
            ],
            total=120000,
            status=0),
    ]

    for order in orders:
        order.insert()
