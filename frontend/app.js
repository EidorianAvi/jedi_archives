const novelForm = document.querySelector('#novel-form');
const loginForm = document.querySelector('#login-form');
const logoutButton = document.querySelector('#logout-button');
const novelAPI = "http://localhost:3000/novels";
const graphicNovelAPI = "http://localhost:3000/graphic_novels";


loginForm.addEventListener('submit', handleLoginSubmit)

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

logoutButton.addEventListener('click', () => {localStorage.removeItem('token')});


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
        .then(response => response.json());
}

