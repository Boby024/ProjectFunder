async function postToBackend(data){
        //let url = "http://lvh.me:5001/api/addProjekt";
        let url = "http://localhost:5001/getOneProjekt";
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

async function postForProjketTitel(data){
        let url = "http://localhost:5001/getProjetktTitel";
        let response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type': 'application/json'}, //'application/json;charset=utf-8'
        body: JSON.stringify(data)
          });

        let result = await response.json();
        //alert(result.message);
        return result;
    }

async function postForLoeschen(data){
        let url = "http://localhost:5001/loeschen";
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
    let idProjekt = localStorage.getItem("kennung");
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
     // only the email because he is a primary key in the table project
    let email = dataUser.email;
    // I send here the curent User and the project id
    // and so the backend can check if the current user is allowed to delete the selected project
    let toSend = {kennung: idProjekt,email:dataUser.email};
    console.log(toSend);
    this.postForLoeschen(toSend).then((response)=>{
        let result = response;
        // firstly I check the response from backend
        // and then I redirect to the current page to main page
        // like if(result.message == "ok") then

            console.log(result.message);
            if(result.message =="project deleted"){
                window.location.href ="index.html";
            }else{
                alert(result.message);
                window.location.reload();
            }
    }).catch((err)=>{
            console.log(err);
        })
});

document.addEventListener("DOMContentLoaded",()=>{
    let idProjekt = localStorage.getItem("kennung");
    let toSend = {kennung: idProjekt};
    if(idProjekt){
        this.postToBackend(toSend).then((response)=>{
            let resp = response;
            let titel = resp.titel;
            let image= resp.imagePath  ;
            let finanzierungslimit = resp.finanzierungslimit;
            let status = resp.status;
            let ersteller = resp.ersteller;
            let vorgaenger;
            if (resp.vorgaenger == null ){
                 vorgaenger = "kein Vorgänger";
                 document.getElementById("vorgaenger").innerHTML += vorgaenger;
            }else {
                 vorgaenger = resp.vorgaenger;
                 dt = {kennung: vorgaenger}
                 console.log(dt)
                this.postForProjketTitel(dt).then((response_2)=>{
                     let resp = response_2;
                     console.log(resp)
                     let titelVorgaenger = resp.titel;
                     document.getElementById("vorgaenger").innerHTML += titelVorgaenger;
                 }).catch(err =>{
                    console.error(err);
                 });

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
                    //document.getElementById("vorgaenger").innerHTML += vorgaenger;

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
