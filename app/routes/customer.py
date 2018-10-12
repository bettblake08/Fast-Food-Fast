from flask import (Blueprint ,render_template)
from .middleware import user_required

customer_pages = Blueprint('customer_pages', __name__)

@customer_pages.route("/login")
def customer_login():
    return render_template('customer/sign_in.html')


@customer_pages.route("/signup")
def customer_signup():
    return render_template('customer/sign_up.html')


@customer_pages.route("/order")
@user_required("customer")
def customer_order_page():
    return render_template('customer/order.html')


@customer_pages.route("/orderHistory")
@user_required("customer")
def customer_order_history_page():
    return render_template('customer/order_history.html')
