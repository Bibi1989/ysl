let sess = sessionStorage.getItem("lock")

if(sess) {
    let url = `http://localhost:3000/users/${sess}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector(".welcome").innerHTML = `${data.fname} ${data.lname}`
    })
    
}else{
    window.location = 'index.html'
}

document.querySelector("#logout").addEventListener("click", () => {
    sessionStorage.clear()
})