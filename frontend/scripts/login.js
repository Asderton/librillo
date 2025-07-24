async function manejar_login(event) {
    const form = event.target;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_login = Object.fromEntries(info_form.entries());
    const url = form.action;
    const parametros = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_login)
    };

    const respuesta = await fetch(url, parametros);
    if (respuesta.ok) {
        const { token } = await respuesta.json();
        localStorage.setItem('token', token);
        window.location.href = '../homepage/';
    } else {    
        const error = await respuesta.json();
        console.error(error);
    }
}

async function manejar_logout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '../homepage/';
}