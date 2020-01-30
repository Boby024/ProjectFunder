
from backend.benutzerStore import *
from backend.projectStore import *
from backend.kategorie import *




app = Flask(__name__)
CORS(app)

@app.route('/getAllUser', methods=['GET'])
def getAllUser():

    dt = BenutzerStore()
    try:
        all = dt.getAllUser()
        dt.completion()
        dt.close()
        message = {"message": "done"}

        for i in all:
            print(i)
    except Exception as err :
        print(err)
        message = {"message":"fail"}
        pass
    return jsonify(message)



@app.route('/getUserDetail', methods=['POST'])
def getUserDetail():
    data = request.get_json()
    dt = BenutzerStore()
    try:
        all = dt.checkUser(data['email'])
        dt.completion()
        dt.close()
        user = all[0]
        print(user)

        if len(all) != 0:
            benutzerData = {"email": user[0], "name": user[1]}
        else:
            benutzerData = {"email":"no user", "name": "no user found"}

        for i in all:
            print(i)
    except Exception as err :
        print(err)
        benutzerData = {"message":"no access to data base"}
        pass
    return jsonify(benutzerData)

@app.route('/login', methods=['POST'])
def checkerUser():
    data = request.get_json()
    dt = BenutzerStore()
    try:
        all = dt.checkUser(data['email'])
        dt.completion()
        dt.close()

        if not all:
            message = {"message": "login fail","email":data['email']}
            print("login fail")
        else:
            message = {"message": "login done","email":data['email']}
            print(all)
            print("login done")
    except Exception as err :
        print(err)
        message = {"message":"no access to data base"}
        pass
    return jsonify(message)

def prepareforJSON(listFromDB, modeller):
  final_list = []
  for first in listFromDB:
    final_list.append(dict(zip(modeller, first)))
  return final_list


@app.route('/getOneProjekt', methods=['POST'])
def getOneProjekt():
    data = request.get_json()
    dt = ProjectStore()
    try:
        all = dt.getOneProjekt(data['kennung'] )
        dt.completion()
        dt.close()
        print(all)
        modeller = ("kennung", "titel", "ersteller", "finanzierungslimit", "vorgaenger", "kategorie", "status")
        onePr = all[0]
        project = {"kennung": onePr[0],"titel":onePr[1],"ersteller":onePr[2], "finanzierungslimit":onePr[3], "vorgaenger":onePr[4], "kategorie":onePr[5], "status":onePr[6]}

        if not all:
            message = {"message": "no project found"}
            print("no project found")
        else:
            message = project
            print(project)
    except Exception as err:
        print(err)
        message = {"message": "no access to data base"}
        pass
    return jsonify(message)

@app.route('/getProjetktTitel', methods=['POST'])
def getProjetktTitel():
    data = request.get_json()
    dt = ProjectStore()
    try:
        all = dt.getProjetktTitel(data['kennung'] )
        dt.completion()
        dt.close()
        print(all)
        modeller = ("kennung", "titel")

        if not all:
            message = {"message": "no project found"}
            print("no project found")
        else:
            onePr = all[0]
            project = {"kennung": onePr[0], "titel": onePr[1]}
            message = project
            print(onePr)
    except Exception as err:
        print(err)
        message = {"message": "no access to data base"}
        pass
    return jsonify(message)

@app.route('/getProjetktTiteForVorgaenger', methods=['POST'])
def getProjetktTiteForVorgaenger():
    data = request.get_json()
    #email = data['email']
    print(data)
    dt = ProjectStore()
    try:
        all = dt.getProjetktTiteForVorgaenger(data['email'] )
        dt.completion()
        dt.close()
        #print(all)
        modeller = ("kennung", "titel")

        if not all:
            message = {"message": "no vorgaenger found"}
            print("no project found")
        elif len(all) == 1:
            onePr = all[0]
            project = {"kennung": onePr[0], "titel": onePr[1]}
            message = project
            print(onePr)
        else:
            # a list of all vorgaenger
            message = prepareforJSON(all,modeller)
            #print(all)
            print(message)


    except Exception as err:
        print(err)
        message = {"message": "no access to data base"}
        pass
    return jsonify(message)

@app.route('/getAllProjects', methods=['GET'])
def getAllProjects():

    dt = ProjectStore()
    try:
        all = dt.getAllProject()
        dt.completion()
        dt.close()
        modeller = ("kennung","titel","ersteller","finanzierungslimit","vorgaenger","kategorie","status")
        final_Liste = prepareforJSON(all,modeller)

        #message = {"message": "done"}

        for i in all:
            print(i)
    except Exception as err :
        print(err)
        message = {"message":"fail"}
        pass
    return jsonify(final_Liste)




@app.route('/getUserProjekte', methods=['POST'])
def getUserProjekte():
    data = request.get_json()
    dt = ProjectStore()
    try:
        all = dt.getUserProjekte(data['email'])
        dt.completion()
        dt.close()
        modeller = ("kennung", "titel", "ersteller", "finanzierungslimit", "vorgaenger", "kategorie", "status")
        final_Liste = []
        if len(all) == 1:
            onePr = all[0]
            final_Liste = {"kennung": onePr[0], "titel": onePr[1], "ersteller": onePr[2], "finanzierungslimit": onePr[3],
                       "vorgaenger": onePr[4], "kategorie": onePr[5], "status": onePr[6]}

        elif len(all) > 1 :
            #modeller = ("kennung", "titel", "ersteller", "finanzierungslimit", "beschreibung", "kategorie", "status")
            final_Liste = prepareforJSON(all, modeller)
        else:
            final_Liste = {"message": "no project found"}

        print(final_Liste)
    except Exception as err:
        print(err)
        final_Liste = {"message": "no access to data base"}
        pass
    return jsonify(final_Liste)




@app.route('/addProject', methods=['POST'])
def addProject():
    data= request.get_json()
    print(data)
    dataSorted = (data["titel"], data["beschreibung"],data["status"],data["finanzierungslimit"],data["ersteller"],data["vorgaenger"],data["kategorie"])
    print(data)
    dt = ProjectStore()
    try:
        dt.addProject(dataSorted)
        dt.completion()
        dt.close()
        message = {"message": "project created"}

        print(dataSorted)
    except Exception as err :
        print(err)
        message = {"message":"project not created"}
        pass
    return jsonify(message)


@app.route('/loeschen', methods=['POST'])
def loeschen():
    data= request.get_json()
    print(data)
    dataSorted = (data["kennung"],data["email"])
    dt = ProjectStore()
    try:
        all = dt.loeschen(dataSorted) # result should be "done" or "fail"
        dt.completion()
        dt.close()
        if all == "done":
            message = {"message": "project deleted"}
        else:
            message = {"message": "project not deleted"}

        print(dataSorted)
        print(all)
    except Exception as err :
        print(err)
        message = {"message":"no access to data base"}
        pass
    return jsonify(message)

@app.route('/getKategorie', methods=['GET'])
def getKategorie():

    dt = Kategorie()
    try:
        all = dt.getKategorie()
        dt.completion()
        dt.close()
        modeller = ("id","name")
        final_Liste = prepareforJSON(all,modeller)

        #message = {"message": "done"}

        for i in all:
            print(i)
    except Exception as err :
        print(err)
        message = {"message":"fail"}
        pass
    return jsonify(final_Liste)



if __name__ == "__main__":
    #port = int("9" + re.match(r"([a-z]+)([0-9]+)", config["username"],re.I).groups()[1])
    #app.run(host='127.0.0.1', port=9191, debug=True)
    app.run(port=5001, debug=True)




