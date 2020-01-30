class ServerData {
    constructor(){}

    async getAllBenutzer() {
    var url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/benutzer ";
    let response = await fetch(url);
    let benutzer = await response.json();
        //console.log(benutzer);
        return benutzer;
    }

    async getMyProjekte() {
    var url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
    let response = await fetch(url);
    let benutzer = await response.json();
    //console.log(benutzer)
    return benutzer;
}

    async  getAllOffneProjekte() {
        var url = "https://5cc5c462f24a0f0014cd1f2d.mockapi.io/api/v1/Post";
        let response = await fetch(url);
        let projects = await response.json();
        //console.log(projects)
        return projects;
        /*
        if(response.status == 200){
            let projects = await response.json();
            //console.log(projects)
            return projects;
        }
        */
    }
    async postProjekt(data){
        let url = "http://lvh.me:5001/api/addProjekt";
        let response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
            });

        let result = await response.json();
        //alert(result.message);
        return result;
    }

}
