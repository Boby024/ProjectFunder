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

document.getElementById("spendenTo").addEventListener("click",()=> {
    let idProjekt = localStorage.getItem("idProjekt");
    let dataUser = JSON.parse(localStorage.getItem("dataUser") );
    let email = dataUser.email;

     const betrag = document.querySelector("#betrag").value.trim();
     let radioAnonym = document.getElementById("radioAnonym").value;

     let toSend;
     if(radioAnonym != ""){
         toSend = {id: idProjekt,email:email,anonym:radioAnonym};
     }else {
         toSend = {id: idProjekt,email:email};
     }

     if(toSend){
         this.postToBackend(toSend).then((response)=>{
            let result = response;
            alert(result.message);
            console.log(result.message);
            window.location.href = "index.html"

        }).catch((err)=>{
            console.log(err);
        })
     }else {
         alert("something went wrong with the given values");
        console.log("something went wrong with the given values");
     }

});

document.getElementById("homeBtn").addEventListener("click",()=>{
    window.location.href = "index.html";
});
