import re

class Serialization(object):
    @classmethod
    def test_password(cls, password, type):
        if type == 1:
            pattern = re.compile(
<<<<<<< HEAD
                r"((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\$#]).{8,16})"
                )
        
        return bool(pattern.match(password, 0))

    @classmethod
    def test_email(cls,email):
        pattern = re.compile(
            r"(^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        )

        return bool(pattern.match(email,0))
=======
                r"((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\$#]).{8,16})")
        
        return bool(pattern.match(password, 0))
>>>>>>> api-v1-tests
