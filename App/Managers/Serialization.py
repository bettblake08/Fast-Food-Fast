import re


class Serialization(object):
    @classmethod
    def test_password(cls, password, t):
        pattern = None

        if t == 1:
            pattern = re.compile(
                r"((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\$#.]).{8,16})"
                )
        
        if pattern == None:
            return False
        else:
            return bool(pattern.match(password, 0))

    @classmethod
    def test_email(cls,email):
        pattern = re.compile(
            r"(^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        )

        return bool(pattern.match(email,0))
