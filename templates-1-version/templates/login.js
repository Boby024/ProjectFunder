async function getAllBenutzer() {
    url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/benutzer ";
    let response = await fetch(url);
    let benutzer = await response.json();
        return benutzer;
}

function login(){
    let dataUser = JSON.parse(localStorage.getItem("dataUser"));
    if(dataUser){
        window.location.href = "profilView.html";
    }else{
        let formularLogin = document.forms["formLogin"];

        const email = formularLogin["email"].value;
        let dataEmail = {email: email};
        console.log(dataEmail);

        this.getAllBenutzer().then(
            (response)=>{
                let resp = response;

                let mail ;
                let name;
                for( var i = 0; i < resp.length; i++){
                    if( email == resp[i].email){
                         mail = resp[i].email;
                         name = resp[i].name;
                         idUser = resp[i].id;
                    }
                }
                console.log(mail);
                console.log(name);
                console.log(resp);
                console.log(idUser)
                let data = {"email": mail, "name": name};
                //const em = localStorage.setItem('mail');
                //const nm = localStorage.setItem("name");
                console.log(data)
                console.log(data.name);
                if (data){
                    //localStorage.setItem("idUser",idUser);
                    //localStorage.setItem("name",name);

                    localStorage.setItem("dataUser",JSON.stringify(data) );
                    window.location.href = "profilView.html";
                    //debugger;
                }
                else{
                    window.location.reload();
                }
            }
        ).catch(error =>{
            console.error(error);
        })
    }

}

document.addEventListener('DOMContentLoaded',()=>{

    let dataUser = JSON.parse(localStorage.getItem("dataUser"));
    if(dataUser){
        window.location.href = "profilView.html";
    }else {

        document.getElementById("btnLogin").addEventListener("click", () => {
            const email = document.querySelector("#email").value.trim();
            this.getAllBenutzer().then(
            (response)=>{
                let resp = response;
                console.log(resp);
                let mail ;
                let name;
                for( var i = 0; i < resp.length; i++){
                    if( email == resp[i].email){
                         mail = resp[i].email;
                         name = resp[i].name;
                         idUser = resp[i].id;
                    }
                }
                if (mail){
                    let data = {"email": mail, "name": name};
                    localStorage.setItem("dataUser",JSON.stringify(data) );
                    window.location.href = "profilView.html";
                    //debugger;
                }
                else{
                    alert("login Fail")
                    window.location.reload();
                }
            }
            ).catch(error =>{
                console.error(error);
            });
        });
    }

});
