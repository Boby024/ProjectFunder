async function postProjekt(data){
        //let url = "http://lvh.me:5001/api/addProjekt";
        let url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
        let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, //'application/json;charset=utf-8'
        body: JSON.stringify(data)
          });

        let result = await response.json();
        //alert(result.message);
        return result;
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

document.getElementById("homeBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});

document.getElementById("btnSubmit").addEventListener("click",()=>{
    // ersteller data kommt vom localStorage und status wird auf automatisch offen vom data base gesetzt
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    let ersteller = dataUser.name;
    let status = "offen";

    if(dataUser){
        let formular = document.forms["myform"];

        let titel = formular["titel"].value;
        let finanzierungslimit = formular["finanzierungslimit"].value;
        let kategorie = formular["kategorie"].value;
        let vorgaenger = formular["vorgaenger"].value;
        let beschreibung = formular["beschreibung"].value;

        let dataForms = {"status":status,"ersteller": ersteller,"titel": titel,"finanzierungslimit":finanzierungslimit,"kategorie":kategorie,"vorgaenger": vorgaenger,"beschreibung":beschreibung};
        console.log(dataForms);
        //sendToServer(dataForms);

         this.postProjekt(dataForms).then((response)=>{
            let feedback = response;
            alert(feedback.message);
            window.location.href = "profilView.html";
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

/*function postProjekt(data){
    axios({
                method: 'post',
                url: "http://lvh.me:5001/api/addProjekt",
                headers : {'Content-Type':'application/json'},
                data: JSON.stringify(data),
                timeout: 3000,
        }).then(response =>{
                    let recu = response;
                    let t = recu.json;
                    console.log(t);
            })
            .catch(err =>{
                console.log((err))
            });
} */
