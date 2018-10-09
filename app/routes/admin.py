from flask import (Blueprint, render_template)

admin_pages = Blueprint('admin_pages', __name__)

@admin_pages.route("/login")
def admin_login():
    return render_template('admin/sign_in.html')
