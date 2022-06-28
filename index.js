window.addEventListener("load", ()=> {
    //added api credentials
    const headers = {"app-id": "62a39b05e29594c9c6420196"};
    
    
    //got all required containers and saved them in variables
    let postContainer = document.querySelector("#a-b-c");
    let lr = document.getElementById("lr");
    let pops =  document.querySelector(".popup");
    let usersCounter = 0;
    
    
    //created an asynchronous function to fetch all posts
    const allPosts = async () =>{
    
        // added a try and catch block to listen for any errors incase of any from the API 
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
    
    
    //created a function handler for the popup 
    const showPopup = ()=>{
      pops.classList.add("active");
    }
    
    
    // created a function to get handle the comments form
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
    
    
    
    // created a function to show every single post from the API response 
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
    
    
    
    
             //added an event listener for the blog to open up a popup
             post.addEventListener("click", e=>{
                e.preventDefault();
    
                //used a promise to fetch the data from the API
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
    
    
                    //added an event listener for all form submits
                    document.querySelector("#d-e-f").appendChild(post);
                    post.classList.add("large");
                    showPopup();
                    document.querySelector("form").addEventListener("submit", e=> {
                        handleForm(e);
                    })
                });
             })
        });
    }
    
    
    
    //created a function to handle anny errors from the try and catch block
    const handleErrors = ()=> {
        document.querySelector('main').innerHTML = "<h6 class='fatal'>Failed to load the resources.</h6>";
    }
    
    
    
    //added an synchronous function to get every single blog post
    async function getPost(id) {
        const response = await fetch("https://dummyapi.io/data/v1/post/"+id+"", {headers: headers});
        const data = await response.json();
        return data;
    }
    
    
    
    //tested out the get post function
    //getPost("osivniNSiosjwiwerox").then(a=>console.log(a));
    
    
    
    
    //created an event listener for the popup close
    document.querySelector(".close").addEventListener("click", a=>{
        a.preventDefault();
        pops.classList.remove("active");
        pops.querySelector(".large").remove();
    })
    
    
    
    //called the get all posts function and tested
    allPosts();
    });