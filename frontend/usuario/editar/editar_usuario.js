function validar_datos(datos){
    const {
        nombre,
        bio
    } = datos;

    if (nombre.trim() === ''){
        return alert("El nombre no puede estar vacio");
    }
    if (bio && bio.trim() ===  ''){
        return alert("La bio no puede ser un texto vacio");
    }
    // Validar campos obligatorios
    if (!nombre){
        return alert("Campos obligatorios faltantes");
    }

}

function estandarizar_datos(datos){
    const {
        foto_perfil,
        bio
    } = datos;

    let foto_estandar;
    let bio_estandar;

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

    return {...datos, foto_perfil: foto_estandar, bio: bio_estandar};
}

async function manejar_submit(event){
    const form = event.target;
    const url_post = form.action;
    event.preventDefault();

    const info_form = new FormData(form);
    const datos_form = Object.fromEntries(info_form.entries());
    validar_datos(datos_form);
    const datos_estandatizados = estandarizar_datos(datos_form);

    const respuesta = await fetchear(url_post,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos_estandatizados)
    });

    if (respuesta.ok) {
        alert('Usuario editado con exito')
        window.location.href = '/frontend/homepage/';
    } else {    
        const error = await respuesta.json();
        if(respuesta.status === 409){
            alert("Nombre de usuario en uso");
        }
        console.error(error);
        return;
    }
}

