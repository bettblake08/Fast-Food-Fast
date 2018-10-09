from flask import (Blueprint ,render_template)

customer_pages = Blueprint('customer_pages', __name__)

@customer_pages.route("/login")
def customer_login():
    return render_template('customer/sign_in.html')
