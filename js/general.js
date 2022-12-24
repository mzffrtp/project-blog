/* Blog Date Start*/
const blogDate = document.getElementById("blogDate")

const nowdate = new Date()

blogDate.innerText = nowdate.toLocaleDateString().replaceAll("/",".")

/* Blog Date End*/
