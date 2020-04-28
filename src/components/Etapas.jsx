import React, { useState } from 'react'
import { TextField, InputAdornment } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import AlertError from './AlertError';
import AlertSuccess from './AlertSuccess';
import axios from 'axios';
import removeCommas from '../helpers/removeCommas';
import Swal from 'sweetalert2';
import selectAllInput from '../helpers/selectAllInput';

const Etapas = (props) => {
    const { data, index, removeEtapa } = props
    const [etapaState, setEtapaState] = useState(data)

    const setInfo = input => {
        setEtapaState({
            ...etapaState,
            [input.target.name]: input.target.value
        })
    }


    const NumberFormatCustom = props => {

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
                isNumericString
            />
        );
    }

    const { fecha_fin, fecha_inicio, monto_ejercido } = etapaState
    const num_etapa = index + 1

    const updateEtapa = async (data) => {

        data.monto_ejercido = removeCommas(data.monto_ejercido);
        const API = 'http://187.218.230.38:81/pistache/api/project/etapas'
        try {
            const respuesta = await axios.put(API, data);
            debugger

            if (respuesta.status === 200) {
                AlertSuccess('Actualizado');
            }
        } catch (error) {
            AlertError('(Update Info etapa) Tipo:' + error)
        }
    }

    const actualizarEtapa = () => {
        updateEtapa(etapaState)
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
                            <TextField
                                onBlur={setInfo}
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
                                name='fecha_fin'
                                variant='outlined'
                                type="date"
                                defaultValue={fecha_fin}
                                className="form-control"
                                onBlur={setInfo}
                            />
                        </div>
                        <div className="col-md-3 col-12 mb-3">
                            <label>Monto ejercido</label>
                            <TextField
                                variant='outlined'
                                name='monto_ejercido'
                                onBlur={setInfo}
                                type="text"
                                onFocus={selectAllInput}
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
                                    onClick={() => actualizarEtapa()}
                                >
                                    Confirmar
                    </button>
                                <button className='btn btn-danger etapasBtn'
                                    onClick={() => eliminarEtapa(data.id)}
                                >
                                    Quitar
                    </button>
                            </div>
                        </div>
                    </div>
                    <hr className="separadorGris"></hr>
                </div>
            </div>
        </div>
    );
}

export default Etapas;