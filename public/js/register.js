// console.log("Working")
function showPass(){
    let span = document.querySelector(".show-password")
    let pass = document.querySelector("#password-register")
    let type = pass.type
    if(type == 'password'){
        pass.type = 'text'
        span.innerHTML = 'hide'
    }else{
        pass.type = 'password'
        span.innerHTML = 'show'
    }
}

function showAlert(msg, color) {

    let div = document.createElement("div")
    div.className = "alert"
    div.innerHTML = msg
    div.style.background = color

    document.body.appendChild(div)

    setTimeout(() => div.remove(), 2000)
}

let showPassword = document.querySelector(".show-password")
let submitRegister = document.querySelector("#submit-register")
showPassword.addEventListener("click", showPass)
submitRegister.addEventListener("submit", registerUser)

function registerUser(e) {
    e.preventDefault()

    let url = `http://localhost:3000/users`

    let fname = document.querySelector("#fname").value
    let lname = document.querySelector("#lname").value
    let email = document.querySelector("#email-register").value
    let password = document.querySelector("#password-register").value

    let data = {
        fname,
        lname,
        email,
        password
    }

    fetch(url)
    .then(res => res.json())
    .then(datas => {

        if(fname == '' || lname == '' || email == '' || password == '') {
            showAlert("Fields are empty", "red")
        }else {
            let find = datas.some(data => {
                if(email == data.email){
                    return true
                }
                else{
                    return false
                }
            })
            
            if(find){
                showAlert("Email exist already!!!", "red")
            }else{
                if(password.length < 4){
                    showAlert("Password is less than 4", "red")
                } else {
                    fetch(url, {
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(() => {
                        showAlert("You have register to ysl", "green")
                        window.location = 'index.html'
                    })
                }
            }
        }
    })
}

