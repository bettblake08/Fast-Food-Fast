from app import create_app
from app.database import DB
from app.database.factory import generate_test_data,generate_initial_data
import os
from flask import redirect

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

@app.route('/')
def index():
    return redirect('https://fastfoodfast8.docs.apiary.io/')
    
if __name__ == "__main__":
    app.run()