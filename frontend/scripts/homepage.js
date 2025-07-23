const url = "http://localhost:3000/api/autores";

fetch(url).then(response => response.json())
.then(data => console.log(data))
.catch(error => console.log(error));

