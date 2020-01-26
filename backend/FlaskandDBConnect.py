from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
#import mysql.connector

app= Flask(__name__)
CORS(app)

app.config['MYSQL_HOST']= 'localhost'
app.config['MYSQL_USER']= 'Bob'
app.config['MYSQL_PASSWORD']= ''
app.config['MYSQL_DB']= 'anzeige'

mysql= MySQL(app)


