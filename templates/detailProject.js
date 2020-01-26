async function postToBackend(data){
        let url = "http://lvh.me:5001/api/addProjekt";
        //let url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
        let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, //'application/json;charset=utf-8'
        body: JSON.stringify(data)
          });

        let result = await response.json();
        //alert(result.message);
        return result;
    }
async function getAllOffneProjekte() {
    url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
    let response = await fetch(url);
    let projects = await response.json();
        //console.log(projects)
        return projects;
}
async function spendenTable() {
    url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/spenden ";
    let response = await fetch(url);
    let spenden = await response.json();
        return spenden;
}

function spenden(){
    window.location.href = "spenden.html";
}
document.getElementById("editieren").addEventListener("click",()=>{
    let idProjekt = localStorage.getItem("idProjekt");
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    let email = dataUser.email;

    this.getAllOffneProjekte().then((response)=>{
            let resp = response;
            for( var i = 0; i < resp.length; i++){
                    if( idProjekt == resp[i].id && email == resp[i].ersteller){
                        window.location.href = "projekt-editieren.html";
                    }
            }

        }).catch((err)=>{
            console.log(err);
        })
});
document.getElementById("loeschen").addEventListener("click",()=>{
    let idProjekt = localStorage.getItem("idProjekt");
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
     // only the email because he is a primary key in the table project
    let email = dataUser.email;
    // I send here the curent User and the project id
    // and so the backend can check if the current user is allowed to delete the selected project
    let toSend = {id: idProjekt,email:email};
    this.postToBackend(toSend).then((response)=>{
        let result = response;
        // firstly I check the response from backend
        // and then I redirect to the current page to main page
        // like if(result.message == "ok") then
            alert(result.message);
            console.log(result.message);
            window.location.href ="index.html";
    }).catch((err)=>{
            console.log(err);
        })
});

document.addEventListener("DOMContentLoaded",()=>{
    let idProjekt = localStorage.getItem("idProjekt");
    if(idProjekt){
        this.getAllOffneProjekte().then((response)=>{
            let resp = response;
            let titel;
            let image  ;
            let finanzierungslimit;
            let status;
            let vorgaenger;
            let ersteller;
            for( var i = 0; i < resp.length; i++){
                    if( idProjekt == resp[i].id){
                         titel = resp[i].titel;
                         image = resp[i].imagePath ;
                         finanzierungslimit = resp[i].finanzierungslimit;
                         status = resp[i].status;
                         vorgaenger = resp[i].vorgaenger;
                         ersteller = resp[i].ersteller;
                    }
            }
                this.spendenTable().then((response)=>{
                    let resp = response;
                    let spendenbetrag;
                    let spender ;
                    for( var i = 0; i < resp.length; i++){
                        if( idProjekt == resp[i].id){
                             spendenbetrag = resp[i].spendenbetrag;
                             spender = resp[i].spender;

                        }
                    }
                    document.getElementById("image").innerHTML += '<img class="elementImgae" src= '+image+'>';
                    document.getElementById("titel").innerHTML += titel;
                    document.getElementById("ersteller").innerHTML += ersteller;

                    document.getElementById("finanzierungslimit").innerHTML += finanzierungslimit+ " €";
                    document.getElementById("spendenbetrag").innerHTML += spendenbetrag+" €";
                    document.getElementById("status").innerHTML += status;
                    document.getElementById("vorgaenger").innerHTML += vorgaenger;

                    document.getElementById("spender").innerHTML += spender;
                }).catch(error =>{
                console.error(error);
                });

            console.log(finanzierungslimit);
            console.log(ersteller);
            console.log(vorgaenger);

        }).catch((err)=>{
            console.log(err);
        })
    }else {
        alert("something went wrong with the selected titel");
        console.log("something went wrong with the selected titel");
    }

});

document.getElementById("homeBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});
