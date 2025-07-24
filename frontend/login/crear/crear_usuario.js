


function validar_datos(datos){
    const {
        username,
        clave1,
        clave2,
        nombre,
        bio
    } = datos;

    if(clave1 !== clave2){
        return alert("Las contraseñas no coinciden");
    }

    if (username.trim() === ''){
        return alert("El nombre de usuario no puede ser vacio");
    }
    if (nombre.trim() === ''){
        return alert("El nombre no puede estar vacio");
    }
    if (bio && bio.trim() ===  ''){
        return alert("La bio no puede ser un texto vacio");
    }
    // Validar campos obligatorios
    if (!username || !clave1 || !clave2 || !nombre){
        return alert("Campos obligatorios faltantes");
    }

}

function estandarizar_datos(datos){
    const {
        username,
        clave1,
        foto_perfil,
        bio
    } = datos;

    let foto_estandar;
    let bio_estandar;
    const clave_plana = clave1;
    const regex_username = /^[a-zA-Z0-9_.-]{3,30}$/;

    if (!regex_username.test(username)){
        return alert("El username debe tener entre 3 y 30 caracteres, permite _ . - como caracteres especiales");
    }
    if (foto_perfil === ''){
      foto_estandar = null;
    }
    else {
        foto_estandar = foto_perfil;
    }

    if (bio === ''){
        bio_estandar = null;
    }
    else{
        bio_estandar = bio;
    }

    return {...datos, foto_perfil: foto_estandar, bio: bio_estandar, clave_plana: clave_plana};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    validar_datos(datos_form);
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_post,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });
    console.log(respuesta);

    if (respuesta.ok) {
        alert('Usuario creado con exito')
        window.location.href = '../';
    } else {    
        const error = await respuesta.json();
        if(respuesta.status === 409){
            alert("Nombre de usuario en uso");
        }
        console.error(error);
        return;
    }
}

