from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
#import mysql.connector
import psycopg2
from psycopg2 import Error

app= Flask(__name__)
CORS(app)

app.config['MYSQL_HOST']= 'localhost'
app.config['MYSQL_USER']= 'Bob'
app.config['MYSQL_PASSWORD']= ''
app.config['MYSQL_DB']= 'anzeige'

mysql= MySQL(app)


con = psycopg2.connect(

"""

con = psycopg2.connect(
                                    host = "localhost",
                                    database = "funder",
                                    port ="5432",
                                    user = "postgres",
                                    password = "Iamusing46@"
                                )

try:
    con = psycopg2.connect(
                                    host = "localhost",
                                    database = "funder",
                                    port ="5432",
                                    user = "postgres",
                                    password = "Iamusing46@"
                                )

    cursor = con.cursor()
    # Print PostgreSQL Connection properties
    print (con.get_dsn_parameters(), "\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")


    postgreSQL_select_Query = "select * from benutzer"

    cursor.execute(postgreSQL_select_Query)
    print("Selecting rows from mobile table using cursor.fetchall")
    mobile_records = cursor.fetchall()
    print(mobile_records)

except (Exception, psycopg2.Error) as error :
    print ("Error while connecting to PostgreSQL", error)
finally:
    #closing database connection.
    if(con):
        cursor.close()
        con.close()
        print("PostgreSQL connection is closed")

"""
