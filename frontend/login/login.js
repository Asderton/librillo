
async function manejar_submit(event) {
    const form = event.target;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_login = Object.fromEntries(info_form.entries());
    const url = form.action;

    const respuesta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_login)
    });

    if (respuesta.ok) {
        const { token } = await respuesta.json();
        localStorage.setItem('token', token);
        window.location.href = '/';
    } else {    
        const error = await respuesta.json();
        alert(error.error);
        console.error(error);
    }
}

async function manejar_logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
}

async function comprobar_sesion() {
    const url = "http://localhost:3000/api/me";
    const result = await fetchear(url);
    if (result.ok){
        const usuario = await result.json();
        const { username, foto_perfil } = usuario;
        console.log(`username: ${username} foto: ${foto_perfil}`);
        window.location.href = `../usuario/?username=${username}`;
    }
    else {
        const error = await result.json();
        console.error(error);
        return;

    }
}


window.onload = comprobar_sesion;