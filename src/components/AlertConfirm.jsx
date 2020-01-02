import Swal from "sweetalert2";

const AlertConfirm = (callback, ...arg) => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Desea eliminar este proyecto?',
        text: "Esto eliminara TODO el contenido referente al proyecto, incluyendo etapas, documentos y notificaciones",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: false
    }).then(async (result) => {
        /* CONFIRMACION DE ELIMINACION */
        if (result.value) {
            const res = await callback(...arg);
            if (res) {
                /* Si fue eliminado en el backend, despliega mensaje */
                swalWithBootstrapButtons.fire(
                    'Eliminado',
                    'El proyecto ha sido eliminado',
                    'success'
                )
            }
        }
    })
}

export default AlertConfirm;