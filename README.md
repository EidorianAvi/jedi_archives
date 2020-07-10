# Jedi Archives
Archive of Star Wars Novels and Graphic Novels


## Table of Contents
* [General Info](#general-info)
* [Inspiration](#inspiration)
* [Demonstration Video](#demonstration-video)
* [Technologies](#technologies)
* [Example Code](#example-code)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)
* [License](#license)


## General Info
The Jedi Archives are to browse all canon Star Wars novels and graphic_novels as well as manage your own collection.

## Inspiration 
I was inspired to build this app due to it being difficult to keep track of my personal Star Wars collection and wanted a tool to catalog all novels and graphic novels and to be able to track which books I may be missing. 

## Demonstration Video (Incoming)
[Jedi Archive Youtube Demonstation]

## Technologies 
* Ruby - version 2.6.1
* Rails - version 6.0.3, >= 6.0.3.1
* HTML5
* CSS3 
* Javascript - version 1.8.5
* bcrypt - version 3.1.7
* Cloudinary


## Example Code
```javascript
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
    .then(graphicNovelForm.reset())
    .then(location.reload());
  }
  
  logoutButton.addEventListener('click', () => {localStorage.removeItem('token')});
  
  let routes = {
    '/' : HomePage,
    '/create_user': CreateUserPage,
    '/novel_archive': NovelArchivePage,
    '/graphic_novel_archive': GraphicNovelPage,
    '/add_to_archives': AddToArchives
  }

  function router(event){
      const path = window.location.hash.split('#')[1] || "/";
      const page = routes[path];
      if(page){
        page();
      }
  }

```

## Features
Current Features:
* Create User and Login with token
* View Novels and Graphic Novels
* View Summaries
* Add new books to either collection with photo upload 
* Single Page Application

Future Features:
* Add books to personal collection
* Filter features
* Aurabesh language integration
* Rating system

## Status
The application is fully functional and ready to be enjoyed at current status. Future updates and improvements are still a possibility for future renditions.

## Contact
Created by [Adrian Avila](https://www.linkedin.com/in/adrian-avila-9730421aa/).

If you have any questions or comments feel free to reach out. Thanks in advance.

## License 
[Click to view](https://github.com/EidorianAvi/jedi_archives/blob/master/LICENSE)
