from flask import (Blueprint, render_template)

admin_pages = Blueprint('admin_pages', __name__)

@admin_pages.route("/login")
def admin_login():
    return render_template('admin/sign_in.html')

@admin_pages.route("/orderManagement")
def admin_management_page():
    return render_template('admin/order_management.html')

@admin_pages.route("/menu")
def admin_menu_page():
    return render_template('admin/menu.html')