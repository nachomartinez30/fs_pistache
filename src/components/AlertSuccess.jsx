import Swal from 'sweetalert2'

function AlertSuccess(msg) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `¡Registro ${msg}!`,
        showConfirmButton: false,
        timer: 500
    });
}

export default AlertSuccess;