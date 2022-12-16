const menuBtn = document.getElementById("menuBtn");
const navBar = document.getElementById("navBar");

menuBtn.addEventListener("click", ()=>{
   
    if(getComputedStyle(navBar,null).display === "none"){
        navBar.style.display = "block"
    } else{
        navBar.style.display = "none"
    }
    
})