import os

from flask import redirect
from flask_webpack import Webpack

from app import create_app
from app.database import DB
from app.database.factory import generate_initial_data, generate_test_data

app = create_app(os.getenv('APP_ENV'))

@app.cli.command("db:init")
def init_db():
    db = DB()
    db.init_db(app)
    generate_initial_data()

@app.cli.command("db:init:test")
def init_db_test():
    db = DB()
    db.init_db(app)
    generate_test_data()

@app.cli.command("db:teardown")
def teardown_db():
    db = DB()
    db.teardown(app)

@app.cli.command("db:destroy")
def destroy_db():
    db = DB()
    db.destroy(app)

@app.route('/')
def index():
    return redirect('https://fastfoodfast8.docs.apiary.io/')
    
webpack = Webpack(app)

if __name__ == "__main__":
    app.run(extra_files=app.config["WEBPACK_MANIFEST_PATH"])
