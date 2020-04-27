import React, { useRef, useState } from 'react'
import Swal from "sweetalert2";
import { TextField, InputAdornment } from '@material-ui/core';
import NumberFormat from 'react-number-format';
// import AlertSuccess from './AlertSuccess';
// import Axios from 'axios';

const Etapas = ({ index, data, updateEtapa, removeEtapa,onChange }) => {
  const [infoEtapa, setinfoEtapa] = useState({})

  const num_etapa = index + 1
  const { monto_ejercido, fecha_inicio, fecha_fin } = infoEtapa

  // const fecha_inicioRef = useRef('')
  // const fecha_finRef = useRef('')
  // const monto_ejercidoRef = useRef('')


  const actualizarEtapa = () => {
    updateEtapa(infoEtapa, index);
  }

  const setInfo = (input) => {
    setinfoEtapa({
      ...infoEtapa,
      [input.target.name]: input.target.value
    })
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

  const NumberFormatCustom = (props) => {

    /* Metodo para formatear los campos de contabilidad  */
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
      // isNumericString
      />
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center no-gutters">
        <div className="col-md-11">

          <h2>Etapa {num_etapa}</h2>
          <div className="form-row align-items-end">
            <div className="col-md-3 col-12 mb-3">
              <label>Inicio </label>
              <TextField
                onChange={setInfo}
                name='fecha_inicio'
                variant='outlined'
                type="date"
                data-date=""
                data-date-format="DD MMMM YYYY"
                defaultValue={fecha_inicio}
                className="form-control" />
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label>Fin</label>
              <TextField
                // ref={fecha_finRef}
                nae='fecha_inicio'
                variant='outlined'
                type="date"
                defaultValue={fecha_fin}
                className="form-control" />
            </div>
            <div className="col-md-3 col-12 mb-3">
              <label>Monto ejercido</label>
              <TextField
                variant='outlined'

                name='monto_ejercido'
                onChange={setInfo}
                type="text"
                defaultValue={monto_ejercido}
                className="form-control"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputComponent: NumberFormatCustom,
                }}
              />
            </div>

            <div className="col-md-3 col-12 mb-3">
              <div className="btn-group btn-group-lg" role="group">
                <button className='btn btn-success etapasBtn'
                  onClick={() => actualizarEtapa()}>
                  Confirmar
                    </button>
                <button className='btn btn-danger etapasBtn'
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
