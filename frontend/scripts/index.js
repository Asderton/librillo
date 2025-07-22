const url = "http://localhost:3000/api/autores";

fetch(url, {credentials: 'include'}).then(response => response.json())
.then(data => console.log(data.length))
.catch(error => console.log(error));

