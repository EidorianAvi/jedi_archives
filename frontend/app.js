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
const graphicNovelPage = document.querySelector('#graphic-novel-archive-page');
const graphicNovelCards = document.querySelector('#graphic-novel-cards');
const exitButton = document.querySelector("#exit");



window.addEventListener("DOMContentLoaded", renderNovelPage)

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

function renderNovelPage(event){
  fetch(novelAPI)
    .then(response => response.json())
    .then(renderNovels)
}

function renderNovels(novels){
  novels.forEach(novel => {
    let li = document.createElement('li');
      li.id = novel.id;
      li.innerHTML = `
      <div id="novel-card">
          <img src=${novel.cover_art} id="card-image">
          <div id='novel-description'>
          <h3>${novel.title}</h3>
          <ul>
            <li>Author: ${novel.author}</li>
            <li>Release Date: ${novel.release_date}</li>
            <li><button class="summary">Summary</button></li>
          </ul>
          </div>
        </div>
          `
          novelPage.append(li);
        })
        let summaries = document.querySelectorAll('.summary')
        summaries.forEach(summary => renderSummary(summary));
      }

function renderSummary(summary){
  summary.addEventListener('click',()=>{
    let summaryID= event.path[5].id;
    fetch(novelAPI)
      .then(response => response.json())
      .then(results => results.forEach(result => {
        if(result.id == summaryID){
          let section = document.createElement('section')
          section.innerHTML = `
            <p>${result.summary}</p>
          `
          novelPage.className = 'hidden';
          header.className = 'hidden';
          page.append(section);
          exitButton.className = "none";
          exitButton.addEventListener('click', () => {
            if (section) {
              section.remove()
            }
            exitButton.className = 'hidden';
            NovelArchivePage()
          })
        }
      }))
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
let routes = {
    '/' : HomePage,
    '/create_user': CreateUserPage,
    '/novel_archive': NovelArchivePage,
    '/graphic_novel_archive': GraphicNovelPage,
    '/add_to_archives': AddToArchives
}


function HomePage(){
  loginBox.className = "none";
  createUserBox.className = "hidden";
  header.className = "hidden";
  exitButton.className ="hidden";
}

function CreateUserPage(){
  loginBox.className = "hidden";
  createUserBox.className = "none";
  header.className = "hidden";
  exitButton.className = "hidden";
}

function NovelArchivePage(){
  header.className ="none";
  novelPage.className= "none";
  formPage.className = "hidden";
  loginBox.className = "hidden";
  createUserBox.className = "hidden";
  graphicNovelPage.className = "hidden";
  exitButton.className = "hidden";
}

function GraphicNovelPage(){
  header.className = "none";
  graphicNovelPage.className = "none";
  formPage.className = "hidden";
  loginBox.className = "hidden";
  createUserBox.className = "hidden";
  novelPage.className = "hidden";
  exitButton.className = "hidden";

}

function AddToArchives(){
  formPage.className = "none";
  exitButton.className = "none";
  header.className = "hidden";
  loginBox.className = "hidden";
  novelPage.className = "hidden";
  graphicNovelPage.className = "hidden";
  createUserBox.className = "hidden";
}

function router(event){
    const path = window.location.hash.split('#')[1] || "/";
    const page = routes[path];
    if(page){
      page();
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
