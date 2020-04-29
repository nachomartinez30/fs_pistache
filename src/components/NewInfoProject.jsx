import React, { Component } from 'react'
import swalert from "sweetalert2";
import axios from 'axios';
/* MATERIAL DESIGN */
import { TextField, InputAdornment } from "@material-ui/core";
import removeCommas from '../helpers/removeCommas';
import NumberFormatCustom from '../helpers/NumberFormatCustom';

/* date Picker */

const API = 'http://187.218.230.38:81/pistache/api/project'

class NewProject extends Component {
    state = {
        infoProject: {
            cve_proyecto: '',
            titulo: '',
            responsable_tecnico: '',
            responsable_admin: '',
            acuerdo: '',
            link_acuerdo: '',
            institucion_responsable: '',
            fecha_fin: '',
            fecha_inicio: '',
            contacto1: '',
            contacto2: '',
            contacto3: '',
            estatus: '',
            semaforo: '',
            carta_finiquito: '',
            area_usuaria: '',
            monto_total_autorizado: '',
            monto_total_ejercido: '',
            procentaje_uso: '',
            etapas: [],
            documentos: []
        }
    }

    manejadorCambios = (ev) => {
        /********************************************************************************************************
         *** PARA QUE FUNCIONE ESTE MANEJADOR, ES NECESARIO QUE EL name DEL INPUT SEA IGUAL AL DEL this.state ***
         ********************************************************************************************************/
        /* toma el name del elemento HTML */
        let elemento = ev.target.name;
        /* toma el valor del elemento HTML */
        let valor = ev.target.value;

        this.setState({
            infoProject: {
                /* TOMA UNA COPIA DEL STATE de react */
                ...this.state.infoProject,
                [elemento]: valor
            }
        })

    }

    manejadorSubmit = async (ev) => {
        /* previene el envio de datos si esta vacío */
        ev.preventDefault();

        /* destructuracion del Objeto */
        const { cve_proyecto,
            titulo,
            responsable_tecnico,
            responsable_admin,
            acuerdo,
            link_acuerdo,
            institucion_responsable,
            fecha_fin,
            fecha_inicio,
            contacto1,
            contacto2,
            contacto3,
            estatus,
            semaforo,
            carta_finiquito,
            area_usuaria,
            monto_total_autorizado,
            monto_total_ejercido,
            procentaje_uso,
        } = this.state.infoProject

        /* si alguno de los states esta vacio */
        if (cve_proyecto === '' || titulo === '' || responsable_tecnico === '' || responsable_admin === '' ||
            acuerdo === '' || link_acuerdo === '' || institucion_responsable === '' ||
            fecha_fin === '' || fecha_inicio === '' || contacto1 === '' ||
            contacto2 === '' || contacto3 === '' || estatus === '' ||
            semaforo === '' || carta_finiquito === '' || area_usuaria === '' ||
            monto_total_autorizado === '' || monto_total_ejercido === '' || procentaje_uso === ''
        ) {
            swalert.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Todos los campos son obligatorios',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            try {
                /* Intenta hacer e insert a la API */
                const data = {
                    cve_proyecto,
                    titulo,
                    responsable_tecnico,
                    responsable_admin,
                    acuerdo,
                    link_acuerdo,
                    institucion_responsable,
                    fecha_fin,
                    fecha_inicio,
                    contacto1,
                    contacto2,
                    contacto3,
                    estatus,
                    semaforo,
                    carta_finiquito,
                    area_usuaria,
                    monto_total_autorizado: removeCommas(monto_total_autorizado),
                    monto_total_ejercido: removeCommas(monto_total_ejercido),
                    procentaje_uso,
                    etapas: [],
                    documentos: []
                }


                const respuesta = await axios.post(API, data);
                /* SI el estatus de la respuesta es 201 fue creado con exito */

                if (respuesta.status === 201) {
                    swalert.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: '¡Proyecto guardado con exito!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            } catch (error) {
                swalert.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Error al insertar usuario!',
                    footer: `<p>Error:${error}</p>`
                })
            }

        }
    }


    render() {
        return (
            <div className="row justify-content-center no-gutters">
                <div className="col-md-11 col-11">
                    <form onSubmit={(ev) => this.manejadorSubmit(ev)}>
                        <div className="form-row">
                            <div className="col-12"><h4>Datos del proyecto</h4></div>
                            <div className="col-md-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Clave de Proyecto'
                                    name='cve_proyecto'
                                    value={this.state.cve_proyecto}
                                    type="text"
                                    placeholder="Nombre Proyecto"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Titulo'
                                    name='titulo'
                                    value={this.state.titulo}
                                    type="text"
                                    placeholder="Titulo Proyecto"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Responsable Técnico'
                                    name='responsable_tecnico'
                                    value={this.state.responsable_tecnico}
                                    type="text"
                                    placeholder="Nombre Responsable Tecnico"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Responsable Administrativo'
                                    name='responsable_admin'
                                    value={this.state.responsable_admin}
                                    type="text"
                                    placeholder="Nombre Responsable Administrativo"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-12"><h4>Contactos de Reporte</h4></div>
                            <div className="col-md-4 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='correo electronico'
                                    name='contacto1'
                                    value={this.state.contacto1}
                                    type="text"
                                    placeholder="correo@contacto.com"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-4 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='correo electronico'
                                    name='contacto2'
                                    value={this.state.contacto2}
                                    type="text"
                                    placeholder="correo@contacto.com"
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-4 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='correo electronico'
                                    name='contacto3'
                                    value={this.state.contacto3}
                                    type="text"
                                    placeholder="correo@contacto.com"
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-12"><h4>Información del proyecto</h4></div>
                            <div className="col-md-6 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Acuerdo'
                                    name='acuerdo'
                                    value={this.state.acuerdo}
                                    type="text"
                                    placeholder="FSIDIT/2018/36/SO/10"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Enlace Acuerdo'
                                    name='link_acuerdo'
                                    value={this.state.link_acuerdo}
                                    type="text"
                                    defaultvalue='http://187.218.230.30/filesconafor/userfiles/LGTAIP/oficio_2018-C02-A3-S-131466.pdf'
                                    placeholder="http://file_server/mi_pdf.pdf"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-12 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Institución'
                                    name='institucion_responsable'
                                    value={this.state.institucion_responsable}
                                    type="text"
                                    placeholder="Ecosur"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 col-6 my-3">
                                <TextField /***/
                                    fullWidth
                                    label='Fecha inicio'
                                    name='fecha_inicio'
                                    value={this.state.fecha_inicio}
                                    type="date"
                                    placeholder="15/05/2020"
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-6 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Fecha fin'
                                    name='fecha_fin'
                                    value={this.state.fecha_fin}
                                    type="date"
                                    placeholder="15/05/2020"
                                    required
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-12"><h4>Estatus del proyecto</h4></div>
                            <div className="col-md-4 col-6 my-3">
                                <label>Estatus</label>
                                <select
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                    name='estatus'
                                    value={this.state.estatus}
                                    className="custom-select">
                                    <option value="">--Seleccione--</option>
                                    <option value="vigente" >Vigente</option>
                                    <option value="conluido" >Concluido</option>
                                    <option value="cancelado">Cancelado</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-6 my-3">
                                <label>Riesgo</label>
                                <select
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                    name='semaforo'
                                    value={this.state.semaforo}
                                    className="custom-select"
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="bajo" ><i className='material-icons riesgoV'>lens</i>Bajo</option>
                                    <option value="medio"><i className='material-icons riesgoA'>lens</i>Medio</option>
                                    <option value="alto"><i className='material-icons riesgoR'>lens</i>Alto</option>

                                </select>
                            </div>
                            <div className="col-md-4 col-6 my-3">

                                <label>Carta Finiquito</label>
                                <select
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                    name='carta_finiquito'
                                    value={this.state.carta_finiquito}
                                    className="custom-select">
                                    <option value="">--Seleccione--</option>
                                    <option value="no">No</option>
                                    <option value="si" >Si</option>
                                </select>
                            </div>
                            <div className="col-md-4 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    label='Área Usuaria'
                                    name='area_usuaria'
                                    value={this.state.area_usuaria}
                                    type="text"
                                    placeholder="Gerencia de Fomento a la P"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}

                                />
                            </div>
                            <div className="col-md-4 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    label='Monto autorizado'
                                    name='monto_total_autorizado'
                                    inputProps={{ step: 0.01 }}
                                    value={this.state.monto_total_autorizado}
                                    type="text"
                                    placeholder=""
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-4 col-6 my-3">

                                <TextField /***/
                                    fullWidth
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    label='Monto ejercido'
                                    name='monto_total_ejercido'
                                    inputProps={{ step: 0.01 }}
                                    value={this.state.monto_total_ejercido}
                                    type="text"
                                    placeholder=""
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />
                            </div>
                            <div className="col-md-12 col-12 my-3">

                                <TextField /***/
                                    fullWidth
                                    label={`Porcentaje de uso ${this.state.infoProject.procentaje_uso}%`}
                                    name='procentaje_uso'
                                    value={this.state.procentaje_uso}
                                    type="range"
                                    required
                                    onChange={(ev) => this.manejadorCambios(ev)}
                                />

                            </div>
                        </div>
                        <hr className="separadorGris"></hr>
                        <button className='btn btn-success text-center my-2'
                            value={this.state.btn}
                            type='submit' >Grabar Datos</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default NewProject;