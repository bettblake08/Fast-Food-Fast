from App import create_app
from Database.db import DB

app = create_app('DEV')

@app.cli.command('initdb')
def db_init():
    db = DB()
    db.init_db(app)

    print('Database tables initialized.')

if __name__ == "__main__":
    app.run()