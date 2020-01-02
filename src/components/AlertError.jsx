import Swal from "sweetalert2";

const AlertError = (msg) => {
    Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Algo salio mal!',
        footer: `<p>${msg}</p>`
    })
}

export default AlertError;