async function fetchear(url, parametros = {}) {
    const headers_nuevos = parametros.headers || {};
    const token = localStorage.getItem('token');
    if (token) {
        headers_nuevos.Authorization = `Bearer ${token}`;
    }

    return await fetch(url, {
        ...parametros,
        headers: headers_nuevos
    });

};