from flask_jwt_extended import verify_fresh_jwt_in_request,get_jwt_claims
from flask import jsonify

import functools

def user_required(roleId):
    """ Decorator to determine logged in user role

        Roles:
            1.  Customer
            2.  Admin

        Args:
            param[role] (int) : Role Id
    """

    def user_identify(fn):
        @functools.wraps(fn)
        def wrapper(*args, **param):
            verify_fresh_jwt_in_request()
            claims = get_jwt_claims()

            if claims['role'] != roleId:
                role = "Unidentified"
                
                if roleId == 1:
                    role = "customer"
                elif roleId == 2:
                    role = "admin"

                return jsonify({
                    "error_msg":'Only {} users have permission to access!'.format(role)
                }), 403
            else:
                return fn(*args, **param)
        
        return wrapper
        
    return user_identify
