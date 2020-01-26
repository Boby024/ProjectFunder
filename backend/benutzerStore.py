from backend.FlaskandDBConnect import *
from backend.benutzer import *
class BenutzerStore:

    def __init__(self):
        self.cur = mysql.connection.cursor()
        self.conn = mysql.connection

    def addBenutzer(self, benutzer):
        cur = self.conn.cursor()
        #bn = Bentzer(benutzer)
        #bn = Bentzer(benutzer[0], benutzer[1], benutzer[3])
        sqlQuery = """ INSERT INTO users (username,passwd,email) VALUES (%s, %s, %s)"""
        cur.execute(sqlQuery, (benutzer[0], benutzer[1], benutzer[2]) )



    def close(self):
        if self.conn is not None:
            try:
                self.conn.commit()
            except (MySQL.Error, MySQL.Warning) as err:
                print(err)
            finally:
                self.conn.close()



"""
    def addBenutzer(self,benutzer):
        cur = self.conn.cursor()
        sqlQuery = " INSERT INTO users (username,passwd,email) VALUES (%s, %s, %s)"
        cur.execute(sqlQuery,(benutzer.getUsername(),benutzer.getPasswd(),benutzer.getEmail() ) )
"""
