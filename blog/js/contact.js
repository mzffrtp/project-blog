const nameLabel = document.getElementById("nameLabel");
const nameInput = document.getElementById("nameInput");

const lastnameLabel = document.getElementById("lastnameLabel");
const lastname = document.getElementById("lastname");

const emailLabel = document.getElementById("emailLabel");
const email = document.getElementById("email");

const messageLabel = document.getElementById("messageLabel");
const message = document.getElementById("message");

const contactForm = document.getElementById("contactForm")

const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const responseContainer=document.getElementById("responseContainer");
const submitBtn = document.getElementById("submitBtn");
const responseText = document.getElementById("responseText");

nameInput.addEventListener("focusin",()=>{
    nameLabel.style.color ="black"
    nameLabel.style.fontSize ="1.5rem"
})

nameInput.addEventListener("focusout",()=>{
    nameLabel.style.color ="rgb(181, 181, 175)"
    nameLabel.style.fontSize ="1rem"
})

lastname.addEventListener("focusin",()=>{
    lastnameLabel.style.color = "black"
    lastnameLabel.style.fontSize ="1.5rem"
})

lastname.addEventListener("focusout",()=>{
    lastnameLabel.style.color ="rgb(181, 181, 175)"
    lastnameLabel.style.fontSize ="1rem"
})

email.addEventListener("focusin", ()=>{
    emailLabel.style.color = "black"
    emailLabel.style.fontSize = "1.5rem"
})

email.addEventListener("focusout",()=>{
    emailLabel.style.color ="rgb(181, 181, 175)"
    emailLabel.style.fontSize ="1rem"
    emailError.innerText=""
})

message.addEventListener("focusin", ()=>{
    messageLabel.style.color = "black"
    messageLabel.style.fontSize = "1.5rem"
})

message.addEventListener("focusout",()=>{
    messageLabel.style.color ="rgb(181, 181, 175)"
    messageLabel.style.fontSize ="1rem"
    messageError.innerText = ""
})

contactForm.addEventListener("submit",(event)=>{
    event.preventDefault()
    if(email.value === ""){
        emailError.innerText = "* Email can´t be left blank"
        email.focus()
        return
    }

    if(message.value === ""){
        messageError.innerText = "* Message area can´t be left blank"
        message.focus()
        return
    }

    const newForm = { 
        name:nameInput.value,
        lastname:lastname.value,
        email:email.value,
        message:message.value,
        date: new Date()
    }

    submitBtn.disabled = true;
    submitBtn.classList.replace("submitBtnActive","submitBtnDisabled")
    submitBtn.innerText = "In progress";

    fetch("http://localhost:3004/add-form", {

        method:"post",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json",
        },

        body:JSON.stringify(newForm) 
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.status === 200) {
            responseContainer.style.display = "block";
            responseContainer.classList.add ("responseSuccess");
            responseText.innerText = "Your message was submitted successfully."
           setTimeout(() => {
            responseContainer.style.display = "none";
            responseContainer.classList.remove ("responseSuccess");
            responseText.innerText = ""
            submitBtn.disabled = false;
            submitBtn.classList.replace("submitBtnDisabled","submitBtnActive")
            submitBtn.innerText ="Submit";
            nameInput.value = "";
            lastname.value = "";
            email.value = "";
            message.value = "";
           }, 3000);
            
        }
    })
    .catch(err=>{
        console.log(err)
        responseContainer.style.display = "block";
        responseContainer.classList.add ("responseFail");
        responseText.innerText = "An error occured. Please try again"
        setTimeout(() => {
            responseContainer.style.display = "none";
            responseContainer.classList.remove ("");
            responseText.innerText = ""
            submitBtn.disabled = false;
            submitBtn.className.replace("submitBtnDisabled","submitBtnActive")
            submitBtn.innerText ="Submit";
           }, 3000);
    })
})