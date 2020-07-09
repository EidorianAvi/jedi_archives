const createUserForm = document.querySelector("#create-user-form");
const loginForm = document.querySelector("#login-form");
const novelForm = document.querySelector("#novel-form");
const graphicNovelForm = document.querySelector("#graphic-novel-form");
const logoutButton = document.querySelector("#logout-button");
const novelAPI = "http://localhost:3000/novels";
const graphicNovelAPI = "http://localhost:3000/graphic_novels";
const userAPI = "http://localhost:3000/users";

// createUserForm.addEventListener('submit', handleCreateSubmit);

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
      const { token } = response;
      localStorage.setItem("token", token);
      let loginConfirmation = document.querySelector("#login-confirmation");
      console.log(loginConfirmation);
      loginConfirmation.className = "success";
      loginConfirmation.innerText = "Welcome";
    });
}

// novelForm.addEventListener('submit', handleNovelForm);

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

// graphicNovelForm.addEventListener('submit', handleGraphicNovelForm);

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

// logoutButton.addEventListener('click', () => {localStorage.removeItem('token')});

// const main = document.querySelector('#page');
// const routes = {
//     '/': HomePage,
//     '/create_user': CreateUserPage,
//     '/archive': ArchivePage
// }

// function HomePage(){
//     return (`
// <div id="login-box">
// <form id="login-form">
//     <input type="text" placeholder="Username" name="username" required/><br />
//     <input type="password" placeholder="Password" name="password" required/><br />
//     <input type="submit" value="Login"/><br/>
//     <p id="login-confirmation></p>
// </form>
// </div>
//     `)
// }

// function CreateUserPage(){
// }

// function ArchivePage(){
// }

// function router(event){
//     const path = window.location.hash.split('#')[1] || "/";
//     const page = routes[path];
//     if(page){
//         main.innerHTML = page();
//     } else {
//         main.innerHTML = `
//             <section>
//                 <h1>404 ERROR</h1>
//             </section>
//         `
//     }
// }

// window.addEventListener('hashchange', router);
// window.addEventListener('load', router);
