function validar_claves(datos){
    if(datos.clave1 !== datos.clave2){
        alert("Las contraseñas no coinciden");
        return false;
    }
    return true;
}

function estandarizar_datos(datos){
    const {
        clave1,
    } = datos;

    campos = ["foto_perfil", "bio"];
    for (const campo of campos){
        if (datos[campo] === ''){
            datos[campo] = null;
        }
    }

    const clave_plana = clave1;
    return {...datos, clave_plana: clave_plana};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    if(!validar_claves(datos_form)){
        return;
    }
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetch(url_post,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        alert('Usuario creado con exito')
        window.location.href = '../';
    } else {    
        const error = await respuesta.json();
        alert(error.error);
        console.error(error);
        return;
    }
}

