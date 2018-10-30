""" This module hosts the test data generation function used in 
    the initialization of the test database 
"""

from app.database.models import OrderModel, OrderItemModel, UserModel,RoleModel
from app.managers.serialization import flask_bcrypt


def generate_test_data():
    """ Generates test data to be used when running tests
    """
    generate_initial_data()

    user = UserModel(
        username="johndoe1",
        email="johndoe1@hotmail.com",
        password=flask_bcrypt.generate_password_hash("johndoe@A1"),
        role="customer")

    user.save()

    admin = UserModel(
        username="johndoe2",
        email="johndoe2@hotmail.com",
        password=flask_bcrypt.generate_password_hash("johndoe@A2"),
        role='admin')

    admin.save()

    order_items = [
        OrderItemModel(
            name="English Breakfast",
            price=600 * 100,
            c_id=1),
        OrderItemModel(
            name="Chicken Burger",
            price=400 * 100,
            c_id=2),
        OrderItemModel(
            name="Coke 350 ml",
            price=100 * 100,
            c_id=4),
    ]

    for item in order_items:
        item.insert()

    orders = [
        OrderModel(
            user_id=user.id,
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
            user_id=user.id,
            items=[
                {
                    'id': 1,
                    'quantity': 3
                }
            ],
            total=180000,
            status=0),
    ]

    for order in orders:
        order.insert()


def generate_initial_data():
    RoleModel(name="customer").insert()
    RoleModel(name="admin").insert()
