import React, { useState, useRef } from 'react'
import AlertError from './AlertError'
/* MATERIAL DESIGN */
import { TextField, InputLabel, MenuItem, Select, FormControl, InputAdornment } from "@material-ui/core";
import NumberFormatCustom from '../helpers/NumberFormatCustom';



const InfoProject = ({ info, actualizarInfoProject }) => {
  /* permite que los Select de MDesign tengan en su etiqueta un ancho  */
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  /* Crear referencias para tomar valores */
  const cve_proyectoRef = useRef('');
  const tituloRef = useRef('');
  const responsable_tecnicoRef = useRef('');
  const responsable_adminRef = useRef('');
  const contacto1Ref = useRef('');
  const contacto2Ref = useRef('');
  const contacto3Ref = useRef('');
  const acuerdoRef = useRef('');
  const link_acuerdoRef = useRef('');
  const institucion_responsableRef = useRef('');
  const fecha_inicioRef = useRef('');
  const fecha_finRef = useRef('');
  const estatusRef = useRef('');
  const semaforoRef = useRef('');
  const carta_finiquitoRef = useRef('');
  const area_usuariaRef = useRef('');
  const monto_total_autorizadoRef = useRef('');
  const monto_total_ejercidoRef = useRef('');
  const procentaje_usoRef = useRef('');

  const {
    id,
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
    monto_total_autorizado,
    monto_total_ejercido,
    procentaje_uso
  } = info;


  const [porcentajeUso, setporcentajeUso] = useState(procentaje_uso)

  const newPorcentaje = parseInt(procentaje_uso);

  const getClassVigencia = (estatus) => {
    let value = '#FFFF'
    switch (estatus) {
      case 'vigente':
        value = 'statusActivo';
        break;
      case 'concluido':
        value = 'statusConcluido2';
        break;
      case 'cancelado':
        //value = '#FF2B12';
        value = 'statusCancelado';
        break;
      default:
        value = '#FFFF'
        break;
    }
    return value;
  }

  const manejadorSubmit = async (ev) => {
    /* Previene el envío */
    ev.preventDefault();

    const data = {
      id: id,
      cve_proyecto: cve_proyectoRef.current.value,
      titulo: tituloRef.current.value,
      responsable_tecnico: responsable_tecnicoRef.current.value,
      responsable_admin: responsable_adminRef.current.value,
      acuerdo: acuerdoRef.current.value,
      link_acuerdo: link_acuerdoRef.current.value,
      institucion_responsable: institucion_responsableRef.current.value,
      fecha_fin: fecha_finRef.current.value,
      fecha_inicio: fecha_inicioRef.current.value,
      contacto1: contacto1Ref.current.value,
      contacto2: contacto2Ref.current.value,
      contacto3: contacto3Ref.current.value,
      estatus: estatusRef.current.value,
      semaforo: semaforoRef.current.value,
      carta_finiquito: carta_finiquitoRef.current.value,
      area_usuaria: area_usuariaRef.current.value,
      monto_total_autorizado: monto_total_autorizadoRef.current.value,
      monto_total_ejercido: monto_total_ejercidoRef.current.value,
      procentaje_uso: procentaje_usoRef.current.value,

    }
    /* SI ALGUN ELEMENTO ESTA VACÏO */
    if (data.cve_proyectoChild === '' ||
      data.tituloChild === '' ||
      data.responsable_tecnicoChild === '' ||
      data.responsable_adminChild === '' ||
      data.acuerdoChild === '' ||
      data.link_acuerdoChild === '' ||
      data.institucion_responsableChild === '' ||
      data.fecha_finChild === '' ||
      data.fecha_inicioChild === '' ||
      data.contacto1Child === '' ||
      data.contacto2Child === '' ||
      data.contacto3Child === '' ||
      data.estatusChild === '' ||
      data.semaforoChild === '' ||
      data.carta_finiquitoChild === '' ||
      data.area_usuariaChild === '' ||
      data.monto_total_autorizadoChild === '' ||
      data.monto_total_ejercidoChild === '' ||
      data.procentaje_usoChild === '') {

      AlertError("Todos los campos son necesarios");
      return;
    } else {
      /* pasa el update al padre */
      actualizarInfoProject(data);
    }
  }

  const manejadorCambios = (ev) => {
    let valor = ev.target.value;
    setporcentajeUso(valor)
  }

  // const NumberFormatCustom = (props) => {

  //   /* Metodo para formatear los campos de contabilidad  */
  //   const { inputRef, onChange, ...other } = props;

  //   return (
  //     <NumberFormat
  //       {...other}
  //       getInputRef={inputRef}
  //       onValueChange={(values) => {
  //         onChange({
  //           target: {
  //             name: props.name,
  //             value: values.value,
  //           },
  //         });
  //       }}
  //       thousandSeparator
  //     // isNumericString
  //     />
  //   );
  // }




  return (
    <div className="cotainer">
      <div className="row justify-content-center no-gutters">
        <div className="col-md-11 col-11">
          <form onSubmit={manejadorSubmit}>
            <div className="form-row">
              <div className="col-12"><h4>Datos del proyecto</h4></div>
              <div className="col-md-6 my-3">
                <TextField
                  variant="outlined"
                  fullWidth
                  label='Clave de Proyecto'
                  inputRef={cve_proyectoRef}
                  name='cve_proyecto'
                  defaultValue={cve_proyecto}
                  type='text'
                  required
                />
              </div>
              <div className="col-md-6 my-3">
                <TextField /**/
                  variant='outlined'
                  fullWidth
                  label='Titulo'
                  inputRef={tituloRef}
                  name='titulo'
                  defaultValue={titulo}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-6 my-3">
                <TextField /**/
                  label='Responsable Técnico'
                  fullWidth
                  variant='outlined'
                  inputRef={responsable_tecnicoRef}
                  name='responsable_tecnico'
                  defaultValue={responsable_tecnico}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-6 my-3">
                <TextField /**/
                  label='Responsable Administrativo'
                  fullWidth
                  variant='outlined'
                  inputRef={responsable_adminRef}
                  name='responsable_admin'
                  defaultValue={responsable_admin}
                  type="text"
                  required
                />
              </div>
              <div className="col-12"><h4>Contactos de Reporte</h4></div>
              <div className="col-md-4 my-3">
                <TextField /**/
                  label='Email 1'
                  fullWidth
                  variant='outlined'
                  inputRef={contacto1Ref}
                  name='contacto1'
                  defaultValue={contacto1}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-4 my-3">
                <TextField /**/
                  label='Email 2'
                  fullWidth
                  variant='outlined'
                  inputRef={contacto2Ref}
                  name='contacto2'
                  defaultValue={contacto2}
                  type="text"
                />
              </div>
              <div className="col-md-4 my-3">
                <TextField /**/
                  label='Email 3'
                  fullWidth
                  variant='outlined'
                  inputRef={contacto3Ref}
                  name='contacto3'
                  defaultValue={contacto3}
                  type="text"
                />
              </div>
              <div className="col-12"><h4>Información del proyecto</h4></div>
              <div className="col-md-4 col-12 my-3">
                <TextField /**/
                  label='Acuerdo'
                  fullWidth
                  variant='outlined'
                  inputRef={acuerdoRef}
                  name='acuerdo'
                  defaultValue={acuerdo}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-4 col-12 my-3">
                <TextField /**/
                  label='Enlace Acuerdo'
                  fullWidth
                  variant='outlined'
                  inputRef={link_acuerdoRef}
                  name='link_acuerdo'
                  defaultValue={link_acuerdo}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-4 col-12 my-3">
                <TextField /**/
                  label='Institución'
                  fullWidth
                  variant='outlined'
                  inputRef={institucion_responsableRef}
                  name='institucion_responsable'
                  defaultValue={institucion_responsable}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-6 col-12 my-3">
                <TextField /**/
                  label='Fecha inicio'
                  fullWidth
                  variant='outlined'
                  inputRef={fecha_inicioRef}
                  name='fecha_inicio'
                  defaultValue={fecha_inicio}
                  type="date"
                  required
                />
              </div>
              <div className="col-md-6 col-12 my-3">
                <TextField /**/
                  label='Fecha fin'
                  fullWidth
                  variant='outlined'
                  inputRef={fecha_finRef}
                  name='fecha_fin'
                  defaultValue={fecha_fin}
                  type="date"
                  required
                />
              </div>
              <div className="col-12"><h4>Estatus del proyecto</h4></div>
              <div className="col-md-4 col-6 my-3">
                <FormControl
                  variant="outlined"
                  fullWidth

                >
                  <InputLabel ref={inputLabel}>Estatus</InputLabel>
                  <Select
                    labelWidth={labelWidth}
                    inputRef={estatusRef}
                    name='estatus'
                    defaultValue={estatus}
                    className={getClassVigencia(estatus)}
                  >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    <MenuItem value="vigente" >Vigente</MenuItem>
                    <MenuItem value="concluido" >Concluido</MenuItem>
                    <MenuItem value="cancelado">Cancelado</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 col-6 my-3">
                <FormControl
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel
                    ref={inputLabel}
                  >
                    Riesgo
                  </InputLabel>
                  <Select
                    labelWidth={labelWidth}
                    inputRef={semaforoRef}
                    name='semaforo'
                    defaultValue={semaforo}
                  >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    <MenuItem value="bajo" ><i className='material-icons selectIconos riesgoV'>lens</i> Bajo</MenuItem>
                    <MenuItem value="medio"><i className='material-icons selectIconos riesgoA'>lens</i> Medio</MenuItem>
                    <MenuItem value="alto"><i className='material-icons selectIconos riesgoR'>lens</i> Alto</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 col-6 my-3">
                <FormControl
                  variant='outlined'
                  fullWidth
                >
                  <InputLabel
                    ref={inputLabel}
                  >Carta Finiquito</InputLabel>
                  <Select
                    labelWidth={labelWidth}
                    inputRef={carta_finiquitoRef}
                    name='carta_finiquito'
                    defaultValue={carta_finiquito}
                  >
                    <MenuItem value=""><em>Ninguno</em></MenuItem>
                    <MenuItem value="no">No</MenuItem>
                    <MenuItem value="si" >Si</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-4 col-12 my-3">
                <TextField /**/
                  label='Área Usuaria'
                  fullWidth
                  variant='outlined'
                  inputRef={area_usuariaRef}
                  name='area_usuaria'
                  defaultValue={area_usuaria}
                  type="text"
                  required

                />
              </div>
              <div className="col-md-4 col-6 my-3">

                <TextField
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  label='Monto autorizado'
                  fullWidth
                  variant='outlined'
                  inputRef={monto_total_autorizadoRef}
                  name='monto_total_autorizado'
                  defaultValue={monto_total_autorizado}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-4 col-6 my-3">
                <TextField /**/
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  label='Monto ejercido'
                  fullWidth
                  variant='outlined'
                  inputRef={monto_total_ejercidoRef}
                  name='monto_total_ejercido'
                  defaultValue={monto_total_ejercido}
                  type="text"
                  required
                />
              </div>
              <div className="col-md-12 col-12 my-3">
                <TextField /**/
                  label={`Porcentaje de uso ${porcentajeUso}%`}
                  fullWidth
                  variant='outlined'
                  inputRef={procentaje_usoRef}
                  onChange={(ev) => manejadorCambios(ev)}
                  name='procentaje_uso'
                  defaultValue={newPorcentaje}
                  type="range"
                  className="form-control"
                  required
                />

              </div>
            </div>
            <hr className="separadorGris"></hr>
            <input className='btn btn-success text-center my-2 ml-0'
              type='submit' value='Guardar Cambios' />
          </form>
        </div>
      </div>
    </div>
  )
}


export default InfoProject;