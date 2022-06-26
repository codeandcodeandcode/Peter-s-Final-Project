window.addEventListener("load", ()=> {

    const headers = {"app-id": "62a39b05e29594c9c6420196"};
    
let postContainer = document.querySelector("#a-b-c");
let lr = document.getElementById("lr");
let pops =  document.querySelector(".popup");
let usersCounter = 0;

const allPosts = async () =>{
    try{
        const r = await fetch("https://dummyapi.io/data/v1/post?limit=9", {headers: headers});
        const d = await r.json();
        show(d);
        lr.style.display = "none";
    }
    catch(err) {
        console.log(err);
        handleErrors();
        lr.style.display = "none";
    }


}   