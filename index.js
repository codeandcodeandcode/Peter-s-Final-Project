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
const showPopup = ()=>{
    pops.classList.add("active");
  }

  const handleForm = (form)=>{
    let txt = document.querySelector("textarea");
    form.preventDefault();
    let l = txt.value;
    if(l == 0) {alert("Please enter a comment."); return}
    else {
       txt.value = ""; 
    }
    let m = document.createElement("div");
    usersCounter++;
    m.innerHTML = `<div class="comment"><h5>User${usersCounter} wrote:</h5><p>${l}</p></div>`
    form.target.after(m);
}

const show = data => {
    data.data.forEach(a => {
        let post = document.createElement('a');
        post.innerHTML = `
        <div><img src="${a.image}"></div>
        <div class="d-c"><h4>${a.text}</h4><p>Likes: ${a.likes}</p></div>
        `;
        post.setAttribute("href", "#");
        post.dataset.id = a.id;
         postContainer.appendChild(post);

         post.addEventListener("click", e=>{
            e.preventDefault();







    
}   