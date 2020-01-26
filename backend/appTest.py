from backend.FlaskandDBConnect import *

from backend.benutzer import *
from backend.benutzerStore import *

@app.route('/api/login', methods=['POST'])
def login():
    return "ok"

@app.route('/api/addbenutzer', methods=['POST'])
def addbenutzer():
    rec = request.get_json()
    try:
        dataBenutzer = BenutzerStore()
        #data = Bentzer("java Name2", "passwaord Java2", "java2@gmail.com")
        data = (rec['username'], rec['passwd'],rec['email'])
        #data = ("java Name1", "passwaord Java1", "java1@gmail.com")
        dataBenutzer.addBenutzer(data)
        suite = "done"
        print(data)
        print("done")
    except Exception as err:
        print(err)
        suite = "fail"
        print("fail")
        pass
    finally:
        BenutzerStore.close
    return jsonify({"status":suite})


#addbenutzer()

@app.route('/api/allUsers', methods=['GET'])
def allUsers():
  try:
    cur = mysql.connection.cursor()
    response=cur.execute('''SELECT * FROM users''')
    result = cur.fetchall()
    cur.close()
  except (MySQL.Error, MySQL.Warning) as err :
    print("something went wrong {}".format(err))
    pass
  modeller=["id","username","passwd","email"]
  return jsonify(result) #jsonify(result)

@app.route('/api/addProjekt', methods=['POST'])
def addProjekt():
    data = request.get_json()
    print(data)
    return jsonify({"message":"DasProjekt wurde erfolgreich hinzugefügt"})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
