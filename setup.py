from setuptools import setup, find_packages


__version__ = "0.0.1"


setup(
    name="fastfoodfast",
    version=__version__,
    description="A Fast Food Restaurant App",
    author="Brian K. Bett",
    author_email="bettblake08@hotmail.com",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "Flask>=1.0.2",
        "Flask-RESTful>=0.3.6",
        "pytest>=3.7.4",
        "coveralls",
        "pytest-cov>=2.6.0",
        "pytest-ordering>=0.5",
        "psycopg2-binary"
    ]
)
