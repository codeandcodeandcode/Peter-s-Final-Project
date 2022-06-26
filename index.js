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

         //Added an event listener for the blog to open up a popup

         post.addEventListener("click", e=>{
            e.preventDefault();

          //Used a promise to fetch the data from the API
          getPost(a.id).then(d=>{
            let t = "";
            d.tags.forEach(g=>t+=`<span>${g}</span>`);
            let post = document.createElement('div');
            post.innerHTML = `
            <div><img src="${d.image}"></div>
            <div class="d-c"><h4>${d.text}</h4><p>Likes: ${d.likes}</p></div>
            <div class="extra"><p>Published on: ${d.publishDate}</p><p>Written By: ${d.owner.firstName}  ${d.owner.lastName}</p></div>
            <div class="tags">${t}</div>
            <form action="">
            <label for="">Add a comment</label>
            <textarea name="" placeholder="Your comment..."></textarea>
            <button type="submit">Save Comment</button>
        </form>  
        `;













    
}   