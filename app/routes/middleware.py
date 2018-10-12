from flask import jsonify, redirect, session

import functools

def redirect_to_login(role):
    if role == "customer":
        return redirect("/customer/login")

    elif role == "admin":
        return redirect("/admin/login")

        
def user_required(role_id):
    """ Decorator to determine logged in user role

        Roles:
            1.  Customer
            2.  Admin

        Args:
            param[role] (string) : Role Id
    """

    def user_identify(fn):
        @functools.wraps(fn)
        def wrapper(*args, **param):
            if "loggedInUser" not in session:
                return redirect_to_login(role_id)

            user = session["loggedInUser"]

            if not user["loggedIn"] or user["role"] != role_id:
                return redirect_to_login(role_id)
            
            return fn(*args, **param)

        return wrapper

    return user_identify
