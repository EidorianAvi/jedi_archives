const createUserForm = document.querySelector("#create-user-form");
const createUserBox = document.querySelector('#create-box')
const loginForm = document.querySelector("#login-form");
const loginBox = document.querySelector('#login-box')
const novelForm = document.querySelector("#novel-form");
const graphicNovelForm = document.querySelector("#graphic-novel-form");
const logoutButton = document.querySelector("#logout-button");
const novelAPI = "http://localhost:3000/novels";
const graphicNovelAPI = "http://localhost:3000/graphic_novels";
const userAPI = "http://localhost:3000/users";
const createLink = document.querySelector('#create-link');
const formPage = document.querySelector('#form-page');
const novelPage = document.querySelector('#novel-archive-page');
const novelCards = document.querySelector('#novel-cards')
const graphicNovelPage = document.querySelector('#graphic-novel-archive-page');
const graphicNovelCards = document.querySelector('#graphic-novel-cards')



createUserForm.addEventListener('submit', handleCreateSubmit);

function handleCreateSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  handleCreateData(formData);
}

function handleCreateData(formData) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  })
    .then((response) => {
      const notifier = document.querySelector("#notifier");
      if (response.ok) {
        notifier.className = "success";
        notifier.textContent = "User Created";
        setTimeout(HomePage, 2000);
      } else {
        notifier.className = "error";
        notifier.textContent = "Username already taken";
        throw new Error("Username already taken");
      }
    })
    .then(createUserForm.reset());
}

loginForm.addEventListener("submit", handleLoginSubmit);

function handleLoginSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  handleLoginData(formData);
}

function handleLoginData(formData) {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.get("username"),
      password: formData.get("password"),
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      let loginConfirmation = document.querySelector("#login-confirmation");
      if(response.error){
        loginConfirmation.className = "error";
        loginConfirmation.innerText = "Invalid Username or Password";
      }else{
      const { token } = response;
      localStorage.setItem("token", token);
      loginForm.reset();
      loginConfirmation.className = "success";
      loginConfirmation.innerText = "Welcome";
      setTimeout(()=>{
        const loginBox = document.querySelector('#login-box');
        loginBox.style.display = "none";
      }, 2000)
      setTimeout(NovelArchivePage, 2000);
    }});
}

fetch(novelAPI)
  .then(response => response.json())
  .then(renderNovels)

function renderNovels(novels) {
  novels.forEach(novel => {
    console.log(novel);
  })
}


novelForm.addEventListener('submit', handleNovelForm);

function handleNovelForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch(novelAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then(novelForm.reset());
}

graphicNovelForm.addEventListener('submit', handleGraphicNovelForm);

function handleGraphicNovelForm(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  fetch(graphicNovelAPI, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
    body: formData,
  })
    .then((response) => response.json())
    .then(graphicNovelForm.reset());
}

logoutButton.addEventListener('click', () => {localStorage.removeItem('token')});
const header = document.querySelector('header')
const main = document.querySelector('#page');
const routes = {
    '/' : HomePage,
    '/create_user': CreateUserPage,
    '/novel_archive': NovelArchivePage,
    '/graphic_novel_archive': GraphicNovelPage,
    '/add_to_archives': AddToArchives,
}


function HomePage(){
  loginBox.className = "none";
  createUserBox.className = "hidden";
  header.className = "hidden";
}

function CreateUserPage(){
  loginBox.className = "hidden";
  createUserBox.className = "none";
  header.className = "hidden";
}


function NovelArchivePage(){
  header.className ="none";
  novelPage.className="none";
  formPage.className = "hidden";
  loginBox.className = "hidden";
  createUserBox.className = "hidden";
  graphicNovelPage.className = "hidden";
}

function GraphicNovelPage(){
  header.className = "none";
  graphicNovelPage.className = "none";
  formPage.className = "hidden";
  loginBox.className = "hidden";
  createUserBox.className = "hidden";
  novelPage.className = "hidden";
}

function AddToArchives(){
  formPage.className = "none";
  loginBox.className = "hidden";
  createUserBox.className = "hidden";
}

function router(event){
    const path = window.location.hash.split('#')[1] || "/";
    console.log(path)
    const page = routes[path];
    console.log(page)
    if(page){
      page();
    } else {
        main.innerHTML = `
            <section>
                <h1>404 ERROR</h1>
            </section>
        `
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
