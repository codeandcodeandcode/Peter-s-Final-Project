window.addEventListener("load", ()=> {
    //fetch
    const headers = {"app-id": "62a39b05e29594c9c6420196"};
    
    let postContainer = document.querySelector("#a-b-c");
    let lr = document.getElementById("lr");
    let pops =  document.querySelector(".popup");
    
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
                let postData = getPost(a.id).then(d=>{
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
                    document.querySelector("#d-e-f").appendChild(post);
                    post.classList.add("large");
                    showPopup();
                    document.querySelector("form").addEventListener("submit", e=> {
                        e.preventDefault();
                        let l = document.querySelector("textarea").value;
                        e.target.innerHTML = `
                        <div class="comment"><h5>Latest comment</h5><p>Peter wrote:</p><p>${l}</p></div>
                        `;
                    
                    })
                });
             })
        });
    }
    
    const handleErrors = ()=> {
        document.querySelector('main').innerHTML = "<h6 class='fatal'>Failed to load the resources.</h6>";
    }
    
    async function getPost(id) {
        const response = await fetch("https://dummyapi.io/data/v1/post/"+id+"", {headers: headers});
        const data = await response.json();
        return data;
    }
    
    document.querySelector(".close").addEventListener("click", a=>{
        a.preventDefault();
        pops.classList.remove("active");
        pops.querySelector(".large").remove();
    })
    
    allPosts();
    });