function showAlert(msg, color) {

    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = msg
    div.style.background = color

    document.body.appendChild(div)

    setTimeout(() => div.remove(), 2000)
}

let submitLink = document.querySelector("#submit-link")
submitLink.addEventListener("submit", addLink)

function addLink(e) {
    e.preventDefault()

    console.log("working")

    let title = document.querySelector("#title").value
    let link = document.querySelector("#link").value

    // let url = `http://localhost:3000/link`

    let data = {
        title,
        link
    }
    console.log(data)

    if(title && link) {
        
        fetch(`http://localhost:3000/link`, {
            method: 'post',
            headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(() => showAlert("Link added!!!", "green"))
    } else {
        showAlert("Fields are empty", "red")
    }
}
