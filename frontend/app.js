const createUserForm = document.querySelector("#create-user-form");
const loginForm = document.querySelector('#login-form');
const novelForm = document.querySelector('#novel-form');
const graphicNovelForm = document.querySelector("#graphic-novel-form");
const logoutButton = document.querySelector('#logout-button');
const novelAPI = "http://localhost:3000/novels";
const graphicNovelAPI = "http://localhost:3000/graphic_novels";
const userAPI = "http://localhost:3000/users";


createUserForm.addEventListener('submit', handleCreateSubmit);

function handleCreateSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    handleCreateData(formData);
}

function handleCreateData(formData){
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        })
    })
    .then(response => response.json())
    .then(console.log)
}

loginForm.addEventListener('submit', handleLoginSubmit);

function handleLoginSubmit(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    handleLoginData(formData);
}

function handleLoginData(formData){
    fetch("http://localhost:3000/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        })
    })
    .then(response => response.json())
    .then(response => {
        const {token} = response
        localStorage.setItem("token", token);
        console.log(token)
    })
}

novelForm.addEventListener('submit', handleNovelForm);

function handleNovelForm(event){
    event.preventDefault();
    const formData = new FormData(event.target)
    fetch(novelAPI,{
        method:"POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json"
        },
        body: formData
    })
    .then(response => response.json())
    .then(novelForm.reset())
}

graphicNovelForm.addEventListener('submit', handleGraphicNovelForm);

function handleGraphicNovelForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    fetch(graphicNovelAPI, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Accept": "application/json"
        },
        body: formData
    })
        .then(response => response.json())
        .then(graphicNovelForm.reset())
}

logoutButton.addEventListener('click', () => {localStorage.removeItem('token')});

fetch(graphicNovelAPI)
    .then(response => response.json())
    .then(result => console.log(result[0].summary))