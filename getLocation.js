function obtenerUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError, {
            enableHighAccuracy: true,
            timeout: 50000,
            maximumAge: 0
        });
    } else {
        document.getElementById('ubicacion').innerHTML = "La geolocalización no es soportada por este navegador.";
    }
}

function mostrarPosicion(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    document.getElementById('ubicacion').innerHTML = "Latitud: " + lat + "<br>Longitud: " + lon;

    var webhookUrl = "https://hook.us1.make.com/yplfbqjmacev070s5v66oa9ndj7y5tl2";
    var data = {
        location: lat + "," + lon
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function mostrarError(error) {
    var mensajeError = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            mensajeError = "El usuario denegó la solicitud de geolocalización.";
            break;
        case error.POSITION_UNAVAILABLE:
            mensajeError = "La información de ubicación no está disponible.";
            break;
        case error.TIMEOUT:
            mensajeError = "La solicitud para obtener la ubicación ha caducado.";
            break;
        case error.UNKNOWN_ERROR:
            mensajeError = "Ha ocurrido un error desconocido.";
            break;
    }
    document.getElementById('ubicacion').innerHTML = mensajeError;
    console.error('Geolocation error:', error);
}
