from flask import (Blueprint, json, jsonify, make_response, redirect, render_template, send_from_directory)
from os import path

main_pages = Blueprint('main_pages', __name__)
root = path.abspath(path.dirname('./'))

@main_pages.route("/")
def index():
    return render_template('index.html')

@main_pages.route('/docs')
def docs():
    return redirect('https://fastfoodfast8.docs.apiary.io/')

@main_pages.route("/assets/<path:filename>")
def send_asset(filename):
    return send_from_directory(path.join(root, "static"), filename)