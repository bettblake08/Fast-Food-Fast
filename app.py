from App import create_app
from App.Database import DB
import os

app = create_app(os.getenv('APP_ENV'))

@app.cli.command("db:init")
def init_db():
    db = DB()
    db.init_db(app)


@app.cli.command("db:teardown")
def teardown_db():
    db = DB()
    db.teardown(app)

if __name__ == "__main__":
    app.run()
