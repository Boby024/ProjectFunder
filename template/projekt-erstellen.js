async function postProjekt(data){
        //let url = "http://lvh.me:5001/api/addProjekt";
        let url = "http://localhost:5001/addProject";
        let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, //'application/json;charset=utf-8'
        body: JSON.stringify(data)
          });

        let result = await response.json();
        //alert(result.message);
        return result;
    }
// needs a kennung == id
async function getProjetktTiteForVorgaenger(data){
        //let url = "http://lvh.me:5001/api/addProjekt";
        let url = "http://localhost:5001/getProjetktTiteForVorgaenger";
        let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, //'application/json;charset=utf-8'
        body: JSON.stringify(data)
          });

        let result = await response.json();
        //alert(result.message);
        return result;
    }
async function getKategorie(){
        //let url = "http://lvh.me:5001/api/addProjekt";
        let url = "http://localhost:5001/getKategorie";
        let response = await fetch(url);
        let projects = await response.json();
        //console.log(projects)
        return projects;
    }
function sendToServer(dataProjekt) {
    //toSend = {text : txt.value.trim()}
    data = JSON.stringify(dataProjekt);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState ==4 && this.status == 200){
            receivedData = JSON.parse(this.responseText);
            return receivedData.message;
        }
    };
    xhttp.open("POST","http://lvh.me:5001/api/addProjekt",true);
    //xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
    xhttp.setRequestHeader("Content-type","application/json" );
    xhttp.send(data);

    //console.log(dataProjekt);
}

document.addEventListener("DOMContentLoaded",()=>{

    //let dataUser = localStorage.getItem("dataUser");
    this.getKategorie().then(
        (resp) =>{
            let liste = resp;
            console.log(liste);
            let all_kategorie = "";
            for(var i= 0; i < liste.length; i++){
                let id = liste[i].id;
                let name = liste[i].name;

                all_kategorie += '<input type="radio" class="kat" id="kat" value='+id+'>'+name

            }
            document.getElementById('kategorie').innerHTML = all_kategorie;

    })
        .catch(err =>{
        console.error(err);
        });
      let dataUser = JSON.parse(localStorage.getItem("dataUser"));
     let email = dataUser.email;
     let toSend = {email: dataUser.email};
     console.log(dataUser);
     console.log(email);
     this.getProjetktTiteForVorgaenger(dataUser).then(
        (resp) =>{
            let liste = resp;
            console.log(liste);
            kein = "Kein Vorgänger";
            val = null;
            let all_vorgaenger;
            let immer = '<input type="radio" class="vorgaenger" id="vorgaenger" value='+val+'>'+kein;
            if(liste.length >1){
                for(var i= 0; i < liste.length; i++){
                let kennung = liste[i].kennung;
                let titel = liste[i].titel;

                all_vorgaenger += '<input type="radio" class="vorgaenger" id="vorgaenger" value='+kennung+'>'+titel

            }
            document.getElementById('vorgaenger').innerHTML = all_vorgaenger;
            document.getElementById('vorgaenger').innerHTML += immer;
            }else if (liste.titel){
                all_vorgaenger += '<input type="radio" class="vvorgaenger" id="vorgaenger" value='+liste.kennung+'>'+liste.titel;
                document.getElementById('vorgaenger').innerHTML = all_vorgaenger;
                document.getElementById('vorgaenger').innerHTML += immer;
            }else{
                document.getElementById('vorgaenger').innerHTML += immer;
            }

    })
        .catch(err =>{
        console.error(err);
        });

});

document.getElementById("homeBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});

document.getElementById("btnSubmit").addEventListener("click",()=>{
    // ersteller data kommt vom localStorage und status wird auf automatisch offen vom data base gesetzt
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    let ersteller = dataUser.email;
    let status = "offen";

    if(dataUser){
        let formular = document.forms["myform"];

        //let titel = formular["titel"].value.trim();
        //let finanzierungslimit = formular["finanzierungslimit"].value;
        //let kategorie = formular["kategorie"].value; // muss a number
        //let vorgaengerFirst = formular["vorgaenger"].value; // muss a number

        let titel = document.getElementById("titel").value.trim();
        let finanzierungslimit = document.getElementById("finanzierungslimit").value;
        let kategorie = document.getElementById("kat").value; // muss a number
        let vorgaengerFirst = document.getElementById("vorgaenger"); // muss a number

        let vorgaenger ;
        if (vorgaengerFirst == null){
            vorgaenger = "";
        }else {
            vorgaenger = vorgaengerFirst;
        }
        let beschreibung = document.getElementById("beschreibung").value.trim();

        let dataForms = {"status":status,"ersteller": ersteller,"titel": titel,"finanzierungslimit":finanzierungslimit,"kategorie":kategorie,"vorgaenger": vorgaenger,"beschreibung":beschreibung};
        console.log(dataForms);
        //sendToServer(dataForms);

         this.postProjekt(dataForms).then((response)=>{
            let feedback = response;
            if (feedback.message == "project created"){
                alert(feedback.message);
                window.location.href = "profilView.html";
            }else {
                alert("something weng wrong => you can try again ")
                window.location.reload();
            }
        }).catch(err =>{
                console.log(err);
        });


    }
    else {
        alert("Erstmals registrieren");
        window.location.href = "index.html";
    }
});





function erstellen(){
    let formular = document.forms["myform"];

    let titel = formular["titel"].value;
    let finanzierungslimit = formular["finanzierungslimit"].value;
    let kategorie = formular["kategorie"].value;
    let vorgaenger = formular["vorgaenger"].value;
    let beschreibung = formular["beschreibung"].value;
    //if (titel =="" || kategorie=="" || vorgaenger== "" || beschreibung==""){
     //   alert("Felder vollständig ausfüllen");
    //}
        let dataForms = {"titel": titel,"finanzierungslimit":finanzierungslimit,"kategorie":kategorie,"vorgaenger": vorgaenger,"beschreibung":beschreibung};
        alert(dataForms.titel)
        axios({
            method: 'post',
            url: "http://lvh.me:5001/api/addProjekt",
            headers : {'Content-Type':'application/json'},
            data: JSON.stringify(dataForms),
        }).then(response =>{
                let recu = response;
                let t = recu.json;
                this.go();
                console.log(t);
            }
        )
            .catch(err =>{
                console.log((err))
                });

}
