from backend.FlaskandDBConnect import *
#from decimal import *
import decimal


class ProjectStore:

    def __init__(self):
        self.conn = mysql.connection


    # PREPARED STATEMENT (WITH PLACEHOLDERS)
    #def addBenutzer(self, benutzerToAdd):
    #    curs = self.conn.cursor()
     #   sqlExample = "INSERT INTO BENUTZER (email,beschreibung,name) VALUES(?, ?, ?)"
      #  curs.execute(sqlExample, (benutzerToAdd.getEmail(), benutzerToAdd.getBeschreibung(), benutzerToAdd.getName()))

    def addProject(self, projectToAdd):
        #getcontext().prec = 2
        curs = self.conn.cursor()
        sqlExample = "INSERT INTO dbp191.projekt (titel,beschreibung ,status,finanzierungslimit ,ersteller ,vorgaenger ,kategorie ) VALUES(?, ?, ?, ?, ?, ?,?)"
        curs.execute(sqlExample, (projectToAdd[0], projectToAdd[1], projectToAdd[2],float(projectToAdd[3]) ,projectToAdd[4],int(projectToAdd[5]),int(projectToAdd[6])))

    def getAllProject(self):
        curs = self.conn.cursor()
        sqlExample = "SELECT p.kennung,p.titel,p.ersteller,p.finanzierungslimit,p.vorgaenger,name,p.status FROM dbp191.Projekt p join dbp191.Kategorie k on p.kategorie = k.id"
        curs.execute(sqlExample)
        result = curs.fetchall()
        return result

    def getOneProjekt(self,kennung):
        curs = self.conn.cursor()
        sqlExample = "SELECT p.kennung,p.titel,p.ersteller,p.finanzierungslimit,p.vorgaenger,name,p.status FROM dbp191.Projekt p join dbp191.Kategorie k on p.kategorie = k.id WHERE p.kennung = ?"
        curs.execute(sqlExample, [kennung])
        result = curs.fetchall()
        return result

    def getProjetktTitel(self,kennung):
        curs = self.conn.cursor()
        sqlExample = "SELECT p.kennung,p.titel FROM dbp191.Projekt p join dbp191.Kategorie k on p.kategorie = k.id WHERE p.kennung = ?"
        curs.execute(sqlExample, [kennung])
        result = curs.fetchall()
        return result

    def getProjetktTiteForVorgaenger(self,email):
        curs = self.conn.cursor()
        sqlExample = "SELECT p.kennung,p.titel FROM dbp191.Projekt p join dbp191.Kategorie k on p.kategorie = k.id WHERE p.ersteller = ?"
        curs.execute(sqlExample, [email])
        result = curs.fetchall()
        return result

    def getUserProjekte(self,email):
        curs = self.conn.cursor()
        sqlExample = "SELECT p.kennung,p.titel,p.ersteller,p.finanzierungslimit,p.vorgaenger,name,p.status FROM  dbp191.Projekt p join dbp191.Kategorie k on p.kategorie = k.id WHERE p.ersteller = ?"
        curs.execute(sqlExample, [email])
        result = curs.fetchall()
        return result

    def loeschen(self,kennung,email):
        curs = self.conn.cursor()
        try:
            sqlExample = "DELETE FROM dbp191.Projekt p  WHERE p.kennung = ? AND p.ersteller= ?"
            curs.execute(sqlExample, ([kennung], [email],) )
            feedback = "done"
        except:
            feedback = "fail"
            pass
        return feedback


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
