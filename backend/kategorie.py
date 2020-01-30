import connect
#from decimal import *
import decimal


class Kategorie:

    def __init__(self):
        #dbUtil = connect.DBUtil().getExternalConnection("testdb")
        self.conn = connect.DBUtil().getExternalConnection()
        self.conn.jconn.setAutoCommit(False)
        self.complete = None

    def getKategorie(self):
        curs = self.conn.cursor()
        sqlExample = "SELECT k.id,k.name FROM dbp191.Kategorie k"
        curs.execute(sqlExample)
        result = curs.fetchall()
        return result


    def completion(self):
        self.complete = True

    def close(self):
        if self.conn is not None:
            try:
                if self.complete:
                    self.conn.commit()
                else:
                    self.conn.rollback()
            except Exception as e:
                print(e)
            finally:
                try:
                    self.conn.close()
                except Exception as e:
                    print(e)