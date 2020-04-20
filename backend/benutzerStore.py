from backend.FlaskandDBConnect import *

class BenutzerStore:
    def __init__(self):
        self.cur = con.cursor()

    def addBenutzer(self, benutzer):
        cur = self.conn.cursor()
        sqlQuery = " INSERT INTO users (username,passwd,email) VALUES (%s, %s, %s)"
        cur.execute(sqlQuery, (benutzer[0], benutzer[1], benutzer[2],) )

    def getAllUser(self):
        curs = self.conn.cursor()
        sqlExample = "SELECT * FROM benutzer"
        curs.execute(sqlExample)
        result = curs.fetchall()
        return result

    def checkUser(self, email):
        curs = self.conn.cursor()
        sqlExample = "SELECT email, name FROM benutzer  WHERE email = ?"
        curs.execute(sqlExample, [email])
        result = curs.fetchall()
        return result

    def close(self):
        if self.conn is not None:
            try:
                self.conn.commit()
            except (Exception,  psycopg2.Error) as err:
                print(err)
            finally:
                self.conn.close()

liste_user = []
liste_user.append( ("user2@yahoo.com","user_2","i still find the site good") )
liste_user.append( ("user3@outlook.com","user_2","I'm searching for new experiences") )
liste_user.append( ("user4@gmail.com","user_2","you're welcome") )
liste_user.append( ("user5@icloud.com","user_2","we're thinking") )


"""

"""


"""
class BenutzerStore:

    def __init__(self):
        self.cur = mysql.connection.cursor()
        self.conn = mysql.connection

    def addBenutzer(self, benutzer):
        cur = self.conn.cursor()
        #bn = Bentzer(benutzer)
        #bn = Bentzer(benutzer[0], benutzer[1], benutzer[3])
        sqlQuery = " INSERT INTO users (username,passwd,email) VALUES (%s, %s, %s)"
        cur.execute(sqlQuery, (benutzer[0], benutzer[1], benutzer[2]) )

   # def addBenutzer(self, benutzerToAdd):
    #    curs = self.conn.cursor()
     #   sqlExample = "INSERT INTO dbp191.benutzer (email,beschreibung,name) VALUES(?, ?, ?,)"
      #  curs.execute(sqlExample, (benutzerToAdd[0], benutzerToAdd[1], benutzerToAdd[2]))

    def getAllUser(self):
        curs = self.conn.cursor()
        sqlExample = "SELECT * FROM benutzer"
        curs.execute(sqlExample)
        result = curs.fetchall()
        return result

    def checkUser(self, email):
        curs = self.conn.cursor()
        sqlExample = "SELECT email, name FROM benutzer  WHERE email = ?"
        curs.execute(sqlExample, [email])
        result = curs.fetchall()
        return result

    def close(self):
        if self.conn is not None:
            try:
                self.conn.commit()
            except (MySQL.Error, MySQL.Warning) as err:
                print(err)
            finally:
                self.conn.close()


"""

"""
    def addBenutzer(self,benutzer):
        cur = self.conn.cursor()
        sqlQuery = " INSERT INTO users (username,passwd,email) VALUES (%s, %s, %s)"
        cur.execute(sqlQuery,(benutzer.getUsername(),benutzer.getPasswd(),benutzer.getEmail() ) )
"""
