function showPass(){
    let span = document.querySelector(".show-password")
    let pass = document.querySelector("#password-login")
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

    setTimeout(() => div.remove(), 5000)
}



let showPassword = document.querySelector(".show-password")
let submitLogin = document.querySelector("#submit-login")
showPassword.addEventListener("click", showPass)
submitLogin.addEventListener("submit", loginUser)

function loginUser(e) {
    e.preventDefault()

    let url = `http://localhost:3000/users`

    let email = document.querySelector("#email-login").value
    let password = document.querySelector("#password-login").value


    fetch(url)
    .then(res => res.json())
    .then(datas => {

        datas.forEach(data => {
            if(email == data.email){
                sessionStorage.setItem("lock", data.id)
            }
        })

        let find = datas.some(data => {
            if(email == data.email){
                return true
            }
            else{
                return false
            }
        })

        let pass = datas.some(data => {
            if(email == data.email && password == data.password){
                return true
            }
            else{
                return false
            }
        })
        
        if(!find) {
            // window.location = 'index.html'
            showAlert(`Invalid email or not register  <a class="reg" href="register.html">Click To Register</a>`, "red")
        } else {
            if(!pass){
                showAlert("Invalid Password", "red")
            } else {
                window.location = 'home.html'
            }
            
        }
    })
}
