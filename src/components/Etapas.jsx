import React, { useRef } from 'react'
import Swal from "sweetalert2";
// import AlertSuccess from './AlertSuccess';
// import Axios from 'axios';

const Etapas = ({ index, data, addEtapa, updateEtapa, removeEtapa, updateData }) => {



  const num_etapa = index + 1
  const { monto_ejercido, fecha_inicio, fecha_fin } = data

  const fecha_inicioRef = useRef('')
  const fecha_finRef = useRef('')
  const monto_ejercidoRef = useRef('')


  const actualizarEtapa = () => {
    const etapaEditada = {
      id: data.id,
      fecha_inicio: fecha_inicioRef.current.value,
      fecha_fin: fecha_finRef.current.value,
      monto_ejercido: monto_ejercidoRef.current.value
    }
    updateEtapa(etapaEditada, index);
  }

  const eliminarEtapa = (id) => {
    Swal.fire({
      title: 'Esta seguro de eliminar esta etapa?',
      text: "las etapas se re-numerarán",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        removeEtapa(id);
      }
    })
  }


  return (
    <div className="container">
      <div className="row justify-content-center no-gutters">
        <div className="col-md-11">

          <h2>Etapa {num_etapa}</h2>
          <div className="form-row align-items-end">
            <div className="col-md-3 col-12 mb-3">
              <label>Inicio </label>
              <input
                ref={fecha_inicioRef}
                type="date"
                defaultValue={fecha_inicio}
                className="form-control" />
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label>Fin</label>
              <input
                ref={fecha_finRef}
                type="date"
                defaultValue={fecha_fin}
                className="form-control" />
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label>Monto ejercido</label>
              <input
                ref={monto_ejercidoRef}
                type="number"
                step="0.01"
                defaultValue={monto_ejercido}
                className="form-control" />
            </div>

            <div className="col-md-3 col-12 mb-3">
              <div className="btn-group btn-group-lg" role="group">
                <button className='btn btn-success etapasBtn'
                  onClick={() => actualizarEtapa()}>
                  Confirmar
                    </button>
                <button className='btn btn-danger etapasBtn' aria-disabled='true'
                  onClick={() => eliminarEtapa(data.id)}>
                  Quitar
                    </button>
              </div>
            </div>
          </div>
          <hr className="separadorGris"></hr>
        </div>
      </div>
    </div>
  )
}

export default Etapas;
