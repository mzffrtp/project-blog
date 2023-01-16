const username = "emrehrmn";
const password = "onecvlandingapi";

const adminLoginPage = document.getElementById("adminLoginPage");
const adminLoggedin = document.getElementById("adminLoggedin");
const queryContainer = document.getElementById("queryContainer");


const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const userPassword = document.getElementById("userPassword");
const loginError = document.getElementById("loginError")

const toTop = document.getElementById ("toTop");

queryContainer.style.display = "none";

loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (usernameInput.value === "") {
        loginError.innerText = "User name cannot be blank!"
        usernameInput.focus()
        setTimeout(() => {
            loginError.innerText = ''
        }, 2000);
        return
    }

    if (userPassword.value === "") {
        loginError.innerText = "Password cannot be blank!"
        userPassword.focus()
        setTimeout(() => {
            loginError.innerText = ''
        }, 2000);
        return
    }

    if (usernameInput.value !== username || userPassword.value !== password) {
        loginError.innerText = "An error occured when logning in! "
        setTimeout(() => {
            loginError.innerText = ""
        }, 3000)
        return
    }


    adminLoginPage.style.display = "none";

    fetch("http://localhost:3004/get-forms", {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: usernameInput.value,
            pass: userPassword.value,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            adminLoggedin.style.display = "block";
            toTop.style.display = "block"
            queryContainer.style.display = "none";
            console.log(data.forms);
            renderForms(data.forms);
        })
        .catch((err) => {
            console.log(err);
        })
});

const renderForms = (forms = []) => {
    for (let i = 0; i < forms.length; i++) {
        const form = document.createElement("div");
        form.classList.add("queryContainer");
        form.innerHTML = `
        <div class="queryLeft">
            <div class="queryRow">
                <span class="queryLabel">Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                <span>${forms[i].name}</span>
            </div>
            <div class="queryRow">
                <span class="queryLabel">Lastname&nbsp;:</span>
                <span>${forms[i].surname}</span>
            </div>
            <div class="queryRow">
                <span class="queryLabel">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                <span><a href="mailto:${forms[i].email}?subject= Answer to your inquery.">${forms[i].email}</a></span>
            </div>
            <div class="queryRow">
                <span class="queryLabel">Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span>
                <span>${new Date(forms[i].date).toLocaleDateString().replaceAll("/", ".")}</span>
            </div>
        </div>
        <div class="queryRight">
            <div class="queryRow">
                <span class="queryLabel">Message:</span>
            </div>
            <p class="queryMessage">${forms[i].message}</p>
        </div>
        `;
        adminLoggedin.appendChild(form)
    }
};

toTop.addEventListener("click", ()=>{
    window.scrollTo({top:0, behavior:"smooth"})
})