# Fast Food Fast
[![Build Status](https://travis-ci.org/bettblake08/Fast-Food-Fast.svg?branch=development)](https://travis-ci.org/bettblake08/Fast-Food-Fast)
[![Coverage Status](https://coveralls.io/repos/github/bettblake08/Fast-Food-Fast/badge.svg?branch=development)](https://coveralls.io/github/bettblake08/Fast-Food-Fast?branch=development)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2225724f61db28f6114b/test_coverage)](https://codeclimate.com/github/bettblake08/Fast-Food-Fast/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/2225724f61db28f6114b/maintainability)](https://codeclimate.com/github/bettblake08/Fast-Food-Fast/maintainability)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b559c6468d3c49aaaa5848dddfe03e45)](https://www.codacy.com/app/bettblake08/Fast-Food-Fast?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bettblake08/Fast-Food-Fast&amp;utm_campaign=Badge_Grade)

This is an web project that implements the online restaurant business requirements set by the FastFoodFast restaurant. FastFoodFast is a restaurant thats serves fast food meals such as french fries, burgers, fried food, soda and much more. But to reach a larger market of customers that are not willing to visit their restaurant, they have decided to produce an online web platform for aspiring customers to make an order from their restaurant. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1.  Fork the repo here [fork me](https://github.com/bettblake08/Fast-Food-Fast)

2.  In your projects folder, open up your cmd/powershell/git bash/... and clone the repository by running the following by running the following, xxxx is your GitHub name:

```
git clone git@github.com:xxxx/Fast-Food-Fast.git 
```

3.  Move into the directory by running the following

```
cd Fast-Food-Fast/
```

### Prerequisites

Before you can bet started on running and testing the project code, you need to do the following:

1. Install GIT version control

If you do not have GIT on your local machine, to run git commands to retrieve this project, you should. Visit the [installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for GIT on all platforms.

2.  Install your preferred text editor

If you do not have a text editor on your machine such as VSCode, Sublime and Atom, make it a point to have one. This is required to writing web development code much easier.

3.  Install python on your local machine

This project is running on [Python](https://docs.python.org/3/using/index.html) as the backbone of the app was developed using the [Flask](http://flask.pocoo.org/docs/1.0/) framework. Ensure you have a running python program of version 3.5 or greater. The recommended version is python 3.7.

4.  Install Postgres Database on your machine

This project uses a Postgres database as the primary data storage of all the data the app handles. [Click here](http://www.postgresqltutorial.com/install-postgresql/) for the installation guide.

### Installing

The following is a step by step guide to install and run the app in a development environment on your local machine.

1.  If you have not installed [virtualenv](https://pypi.org/project/virtualenv/), a python virtual environment tool for generating a virtual environment where all the python modules can be installed, in your terminal, run the following:

```
pip install virtualenv
```

2.  Relocate to the project directory, then run the following to create the new python virtual environment:

```
virtualenv env
```

Note: I recommend specifying the python version of the new virtual environment. Click here to [learn more](https://realpython.com/python-virtual-environments-a-primer/).

3.  Activate your virtual environment by running the following:

In Linux,

```
source env/bin/activate
```

In Windows powershell,
```
env/Scripts/activate
```

In Windows CMD,
```
env/Scripts/activate.bat
```

When activated, in the terminal, you shall be able to see the virtual environment name in front of your project directory as such:

```
(env)<Local machine>:<Project Folder>$  
```

Note: Above is the representation in Linux


4.  When activated, to install the python modules required to run the application, run the following:

```
python setup.py build
python setup.py install
```

This will take care of installing all the dependencies required for the application to run


5.  When the above is done, run the following to host the application on the machine:

```
python app.py
```

You should be able to view the details on which the app is running in.


## Running the tests

To run the application tests, run the following:

```
python -m pytest -v
```

This runs all the test scripts and provides a detailed view on each test scripts function status.  


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.


## Authors

* **Brian Kipkirui Bett** - *Initial work* - [bettblake08](https://github.com/bettblake08)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.