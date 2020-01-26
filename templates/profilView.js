 async function getMyProjekte() {
    url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
    let response = await fetch(url);
    let benutzer = await response.json();
    //console.log(benutzer)
    return benutzer;
}

document.getElementById("homeBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});

document.addEventListener('DOMContentLoaded',()=>{
     let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    // console.log(idUser);
     if(dataUser){
         this.getMyProjekte().then(
            (response) =>{
                let liste = response;
                let finalVersion = "";
                let lengthProjekte = liste.length;
                console.log(liste);
                for(var i= 0; i < liste.length; i++){
                //console.log(liste[i]);
                    let image = liste[i].imagePath ;
                    let titel = liste[i].titel;
                    let ersteller = liste[i].ersteller;
                    let finanzierungslimit = liste[i].finanzierungslimit;
                    //console.log(image);
                    finalVersion += '<div class="element">' +
                        '<img class="elementImgae" src= '+image+'>' +
                        '                <p class="titel">'+titel+'</p>' +
                        '                <p class="user"><strong>von: </strong>'+ersteller+'</p>' +
                        '                <p class="money"><strong>Aktuell: </strong>'+finanzierungslimit+'</p>' +
                        '</div>'
                }
                document.getElementById("profil").innerHTML += dataUser.name;
                document.getElementById("username").innerHTML += dataUser.email;
                document.getElementById("erProjekte").innerHTML += lengthProjekte;
                document.getElementById('conteneur1').innerHTML += finalVersion;
            }
        ).catch(err =>{
            console.error(err);
            window.location.href ="index.html";
        })
     }else{
         location.href = "index.html"
     }
 });

document.getElementById("logOut").addEventListener("click",function () {
    localStorage.clear();
    location.href = "index.html";
});

















/*async function getAllBenutzer() {
    url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/benutzer ";
    let response = await fetch(url);
    let benutzer = await response.json();
        //console.log(benutzer);
        return benutzer;
    }

async function getUserData() {
    let idUser = localStorage.getItem("idUser");
    console.log(idUser);
    this.getAllBenutzer().then(
            (response)=>{
                let resp = response;
                let userObject = resp.find(arr => arr.id === idUser);
                console.log(userObject);
                return userObject;
            }
        ).catch(error =>{
            console.error(error);
        })
}


//getUserData();


/*function view() {
    // these two variables (email, name) below are empty, muss be done !!!!!!!!
    //let email = localStorage.getItem("mail");
    //let name = localStorage.getItem("name");
    //console.log(email);
    getUserData().then((userR =>{let user = userR; console.log(user)})).catch(err =>{
            console.error(err);
        })
    if(getUserData()){

        console.log(getUserData().id);
        document.getElementById("erProjekte").innerHTML += 7//data.email;
        document.getElementById("unProjekte").innerHTML += 7//data.name;

        this.getMyProjekte().then(
            (response) =>{
                let liste = response;
                let finalVersion = "";
                let lengthProjekte = liste.length;
                console.log(liste);
                for(var i= 0; i < liste.length; i++){
                //console.log(liste[i]);
                    let image = liste[i].imagePath ;
                    let titel = liste[i].titel;
                    let ersteller = liste[i].ersteller;
                    let finanzierungslimit = liste[i].finanzierungslimit;
                    //console.log(image);
                    finalVersion += '<div class="element">' +
                        '<img class="elementImgae" src= '+image+'>' +
                        '                <p class="titel">'+titel+'</p>' +
                        '                <p class="user"><strong>von: </strong>'+ersteller+'</p>' +
                        '                <p class="money"><strong>Aktuell: </strong>'+finanzierungslimit+'</p>' +
                        '</div>'
                }
                document.getElementById("profil").innerHTML += email;
                document.getElementById("username").innerHTML += name;
                document.getElementById("erProjekte").innerHTML += lengthProjekte;
                document.getElementById('conteneur1').innerHTML += finalVersion;
            }
        ).catch(err =>{
            console.error(err);
            window.location.href ="index.html";
        })

    }
    //else {
    //    window.location.href ="index.html";
    //}
} */
//view();

//document.addEventListener('DOMContentLoaded',view);
