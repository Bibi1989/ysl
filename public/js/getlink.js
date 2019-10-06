window.onload = function() {
    getLinks()
}

function showAlert(msg, color) {

    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = msg
    div.style.background = color

    document.body.appendChild(div)

    setTimeout(() => div.remove(), 2000)
}

let postUp = ''

function getLinks() {
    let url = `http://localhost:3000/link`
    fetch(url)
    .then(res => res.json())
    .then(datas => {
        console.log(datas)
        datas.forEach(data => {
            document.querySelector(".card").innerHTML += 
            `
                <div class="body">
                    <h1>${data.title}</h1>
                    <p class="title">Title: ${data.title}</p>
                    <p class="link">Url Link: ${data.link}</p>
                    <input type="button" id="${data.id}" onClick=deleteLink(${data.id}) class="del" value="Delete">
                    <input type="button" id="${data.id}" onClick=openPop(${data.id}) class="edit" value="Edit">
                </div>
            `
        })
               
    })
}

let pop = document.querySelector(".pop")
let close = document.querySelector(".close")
close.addEventListener("click", closePop)

let update = document.querySelector(".update")
update.addEventListener("click", updatePop)

function closePop() {
    pop.style.display = 'none'
}

function openPop(id) {
    pop.style.display = 'grid'

    postUp = `http://localhost:3000/link/${id}`
    
    let title = document.querySelector("#pop-title")
    let link = document.querySelector("#pop-link")

    fetch(postUp)
    .then(res => res.json())
    .then(data => {
            title.value = `${data.title}`
            link.value = `${data.link}`
    })

    
}

function updatePop() {

    let title = document.querySelector("#pop-title").value
    let link = document.querySelector("#pop-link").value

    let data = {
        title,
        link
    }

    fetch(postUp, {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        showAlert("Link Updated", "blue")
    })
}

function deleteLink(id) {
    fetch(`http://localhost:3000/link/${id}`, {
        method: 'delete'
    })
    .then(res => res.json())
    .then(() => {
        showAlert("Link Deleted", "red")
    })
}
