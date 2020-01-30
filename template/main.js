
async function getAllOffneProjekte() {
    //let url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
    let url = "http://localhost:5001/getAllProjects";
    let response = await fetch(url);
    let projects = await response.json();
        //console.log(projects)
        return projects;
}
function goToDetail(selbst) {
    // here only the titel + id (Kennung primary key)
    var id = selbst.innerText;
    let arr = id.split("--");
    //get only the last element = primary key for project
    let last = arr[arr.length-1];
    console.log(last)
    localStorage.setItem("kennung",last);
    window.location.href = "detailProject.html";
}

function offneProjekte(){
    this.getAllOffneProjekte().then(
        (resp) =>{
            let liste = resp;
            console.log(liste);
            let finalVersion = "";
            let abgeschlosseneP = "";
            for(var i= 0; i < liste.length; i++){
                //console.log(liste[i]);
                if(liste[i].status == "offen"){
                    let image = liste[i].imagePath;
                    let titel = liste[i].titel;
                    let ersteller = liste[i].ersteller;
                    let finanzierungslimit = liste[i].finanzierungslimit;
                    let idProjekt = "--"+liste[i].kennung;
                    //console.log(image);
                    // I only use it for routing, i.e with that I'ld ask the data base for this project
                    // that's why "primary" is hidden
                    let primary = "<p id='hiddenId' class='hiddenId' hidden>"+idProjekt+"</p>";

                    //let link = "<a "+"id="+"btnLink"+" class="+"btnLink"+" href= detailProject.html>"+titel+"</a>";
                    let link = "<p id='linkToDetail' class='linkToDetail' style='color: blue' onclick='goToDetail(this)' '>"+titel+idProjekt+"</p>";
                    let linkProfil = "<a href= profilView.html>"+ersteller+"</a>";

                    finalVersion += '<div class="element" id="element">' +
                        '<img class="elementImgae" src= '+image+'>' +
                        '                <div class="titelLink" id="titelLink" >'+link+'</div>' +
                        '                <p class="user"><strong>von: </strong>'+linkProfil+'</p>' +
                        '                <p class="money"><strong>Aktuell: </strong>'+finanzierungslimit+'€</p>' +
                        '</div>'
                }else{
                    let image = liste[i].imagePath;
                    let titel = liste[i].titel;
                    let ersteller = liste[i].ersteller;
                    let finanzierungslimit = liste[i].finanzierungslimit;
                    let idProjekt = "--"+liste[i].kennung;
                    //console.log(image);
                    // I only use it for routing, i.e with that I'ld ask the data base for this project
                    // that's why "primary" is hidden
                    let primary = "<p id='hiddenId' class='hiddenId' hidden>"+idProjekt+"</p>";

                    //let link = "<a "+"id="+"btnLink"+" class="+"btnLink"+" href= detailProject.html>"+titel+"</a>";
                    let link = "<p id='linkToDetail' class='linkToDetail' style='color: blue' onclick='goToDetail(this)' '>"+titel+idProjekt+"</p>";
                    let linkProfil = "<a href= profilView.html>"+ersteller+"</a>";

                    abgeschlosseneP += '<div class="element" id="element">' +
                        '<img class="elementImgae" src= '+image+'>' +
                        '                <div class="titelLink" id="titelLink" >'+link+'</div>' +
                        '                <p class="user"><strong>von: </strong>'+linkProfil+'</p>' +
                        '                <p class="money"><strong>Aktuell: </strong>'+finanzierungslimit+'€</p>' +
                        '</div>'
                }
            }
            document.getElementById('conteneur1').innerHTML = finalVersion;
            document.getElementById('conteneur2').innerHTML = abgeschlosseneP;


        }
    )
        .catch(err =>{
        console.error(err);
        }
    )

}

document.addEventListener("DOMContentLoaded",()=>{
    this.offneProjekte();

});

//document.addEventListener("DOMContentLoaded",offneProjekte);
konto = document.querySelector('#btnProfil');
konto.addEventListener('click',login);
function login() {
    window.location.href = "login.html";
}

projekt = document.querySelector('#btnProjekt');
projekt.addEventListener('click',projektErstellen);
function projektErstellen() {
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    if(dataUser){
        window.location.href = "projekt-erstellen.html";
    }else{
        alert("Sie brauchen erstmal ein Konto");
    }
}
