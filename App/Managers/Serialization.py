import re

class Serialization(object):
    @classmethod
    def test_password(cls, password, type):
        if type == 1:
            pattern = re.compile(
                r"((?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@\$#]).{8,16})")
        
        return bool(pattern.match(password, 0))
