import React, { useState, useEffect } from "react";
/* LIBRERIAS */
import "../assets/styles/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "react-bootstrap";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import axios from "axios";
import lodash from "lodash";
import uuid from 'uuid'

/* Material Design */
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

/* COMPONTES */
import InfoProject from "../components/InfoProject";
import Etapas from "../components/Etapas";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import Documentos from "../components/Documentos";
import Swal from "sweetalert2";
import Comentarios from "../components/Comentario";
import DocumentoAcciones from "../components/DocumentoAcciones";
import BtnSubirDocumento from "../components/BtnSubirDocumento";
import { BtnVolver } from "../components/BtnVolver";
import EtapasRemaster from "../components/EtapasRemaster";


const Project = (props) => {


  /* ====================================STATES==================================== */
  const [dataProject, setDataProject] = useState('')
  const [reloadDataProject, setReloadDataProject] = useState(false)

  const [reloadProject, setReloadProject] = useState(true)
  const [etapas, setEtapas] = useState([])
  const [reloadEtapas, setReloadEtapas] = useState(false)

  const [documentos, setDocumentos] = useState([])
  const [documentPressedId, setDocumentPressedId] = useState('')
  const [turno, setTurno] = useState('')
  const [reloadDocumentos, setReloadDocumentos] = useState(false)
  // const [conteoCommistXDocumento, setConteoCommistXDocumento] = useState([])

  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [comentariosDocumento, setComentariosDocumento] = useState('')
  const [styleMenuComits, setStyleMenuComits] = useState('menuComentarios')
  /* ====================================STATES==================================== */

  /* ====================================METODOS PARA MANEJO DE ETAPAS==================================== */


  const removeEtapa = async (id) => {
    const API = 'http://187.218.230.38:81/pistache/api/project/etapas'
    try {
      const respuesta = await axios.delete(`${API}/${id}`);

      if (respuesta.status === 200) {
        setReloadProject(true)
        AlertSuccess('Actualizado');
      }

    } catch (error) {
      AlertError('(Delete etapas) ' + error);
    }

  }

  /* Obtiene los numeros de comentarios por documento */
  const getCommits = (idDocumento) => {
    let documento = lodash.find({ ...documentos }, (buscar) => (buscar.id === idDocumento))

    setComentariosDocumento(documento.comentarios);
    setDocumentPressedId(idDocumento);
    setTurno(documento.turno);
    setReloadDocumentos(true)
  }

  
  /* ====================================MEOTODOS PARA MANEJO DE ETAPAS==================================== */

  const getInfoProject = async () => {
    /* AXIOS para traer la informacion de un ID especifico */
    const API = 'http://187.218.230.38:81/pistache/api/project/'
    // const API = 'http://localhost:3001/all' /* Pruebas */

    const { id_proyecto } = props.match.params
    try {
      const respuesta = await axios.get(`${API}/${id_proyecto}`);

      if (respuesta.status === 200) {
        setDataProject(respuesta.data)
        setEtapas(respuesta.data.etapas)
        setDocumentos(respuesta.data.documentos)
      }

    } catch (error) {
      AlertError('(Get Info Project)Tipo:' + error)
      console.error(error);
    }
  }

  /* CUANDO SE ACTUALICE EL ESTADO DE reloadProject */
  useEffect(() => {
    /* si necesita regargar el proyecto, consulta nuevamente la API */
    if (reloadProject) {
      getInfoProject()
    }
    setReloadProject(false)
  }, [reloadProject])

  /* CUANDO SE ACTUALICE EL ESTADO DE ETAPAS */
  useEffect(() => {
    if (reloadEtapas) {
      insertEtapa()
      updateData()
    }
    setReloadEtapas(false)
  }, [reloadEtapas])


  useEffect(() => {
    if (reloadDataProject) {
      updateData()
    }
    setReloadDataProject(false)
  }, [reloadDataProject])



  /* ====================================METODOS PARA MANEJO DE COMENTARIOS==================================== */

  /* ====================================METODOS PARA MANEJO DE COMENTARIOS==================================== */

  const openMenu = () => {
    setIsMenuOpened(true);
    setStyleMenuComits('openMenu')
  }

  const closeMenu = () => {
    setIsMenuOpened(false);
    setStyleMenuComits('menuComentarios')

  }

  const actualizarInfoProject = (data) => {
    const newData = { ...data }
    setDataProject(newData)
    setReloadDataProject(true)
  }

  const updateData = async () => {
    const newData = { ...dataProject }
    newData.etapas = etapas;
    newData.documentos = documentos;

    setDataProject(newData)
    try {
      const url = 'http://187.218.230.38:81/pistache/api/project/' + dataProject.id

      const respuesta = await axios.put(url, newData);

      if (respuesta.status === 201) {
        console.log('rigth here');
        setReloadProject(true)
        AlertSuccess('Actualizado');
      }
    } catch (error) {
      AlertError(`(Update Etapa) ${error}`);
    }
  }

  const insertEtapa = async () => {

    const newEtapa = {
      id: uuid(),
      fk_proyecto: dataProject.id,
      fecha_inicio: '',
      fecha_fin: '',
      monto_ejercido: '',
      numero: dataProject.etapas.length + 1
    };

    try {
      const url = 'http://187.218.230.38:81/pistache/api/project/etapas/'

      const respuesta = await axios.post(url, newEtapa);

      if (respuesta.status === 200) {
        setReloadProject(true)
        AlertSuccess('Actualizado');
      }
    } catch (error) {
      AlertError(`(Set Data Project) Error:${error}`);
    }
  }

  const tunarDocumento = () => {
    Swal.mixin({
      confirmButtonText: "Siguiente",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      timerProgressBar: true,
      showLoaderOnConfirm: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: '¿A quien desea turnar?',
        input: 'input',
        html: `<p>Turnar involucra pasar la respuesta principal a alguno de los siguientes roles:</p>
              <select id  ='persona_turnar' class='form-control mb-3'>
                  <option value='st'>(S.T.) Secretario Tecnico</option>
                  <option value='sa'>(S.A.) Secretario Administrativo</option>
                  <option value='area_usuaria'>(A.U.) Area usuaria</option>
              </select>
              <select id  ='accion_turno' class='form-control'>
                  <option value='atencion'>Atención conducente</option>
                  <option value='conocimiento'>Solo de conocimiento</option>
              </select>`,
        preConfirm: () => {
          const turno = {
            persona_turnar: document.getElementById('persona_turnar').value,
            accion: document.getElementById('accion_turno').value
          }
          return turno
        }
      },
      {
        title: '¿A quien desea notificar?',
        input: 'input',
        html: `<p>Este apartado solo notificará a los involucrados siguientes</p>
        <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                      <div class="custom-control custom-checkbox align-content">
                          <input type='checkbox' class='form-check-input' value='st' id='chck_secretario_tecnico'>
                          <label class='form-check-label' for='chck_secretario_tecnico'>Secretario Tecnico</label>
                      </div>
                  </li>
                  <li class="list-group-item">
                      <div class="custom-control custom-checkbox">
                          <input type='checkbox' class='form-check-input' value='sa' id='chck_secretario_administrativo'>
                          <label class='form-check-label' for='chck_secretario_administrativo'>Secretario Administrativo</label>
                      </div>
                  </li>
                  <li class="list-group-item">
                      <div class="custom-control custom-checkbox">
                          <input type='checkbox' class='form-check-input' value='area_usuaria' id='chck_area_usuaria'>
                          <label class='form-check-label' for='chck_area_usuaria'>Area usuaria</label>
                      </div>
                  </li>
              </ul>`,
        preConfirm: () => {
          let checkboxes = {
            chck_secretario_tecnico: document.getElementById('chck_secretario_tecnico').value,
            chck_secretario_administrativo: document.getElementById('chck_secretario_administrativo').value,
            chck_area_usuaria: document.getElementById('chck_area_usuaria').value,
          }
          return checkboxes;
        }
      },
    ]).then((result) => {
      /* TOMAR DATOS */
      /* PREPARAR AXIOS PARA ENVIO DE NOTIFICACIONES */
      /* SI RESPONDE CON 200 MOSTRAR ALERTA DE EXITO */
      /* SI-NO MOSTRAR MENSAJE DE ERROR */

      /* TODO: borrar simulacion de axios de notificaciones */
      if (result.value) {
        // const answers = JSON.stringify(result.value)
        /* Alerta de carga */

        Swal.fire({
          title: 'Turnando...',
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 3000,
          onOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          /* el axios concluyo con exito */
          Swal.fire({
            title: 'Exito!',
            icon: 'success',
            html: `<p>Se ha turnado y notificado con exito!</p>`,
            confirmButtonText: 'Terminar'
          })
          setTurno(result.value[0].persona_turnar)
        })
      }
    })
  }

  const subirDocumento = () => {
    /* TODO: INTEGRACION CON API DE SAS-DOC PARA MANEJO DE TURNOS Y RESPUESTAS */
    Swal.fire({
      title: "Proximamente!",
      text: "integracion con SAS-Doc"
    })
  }

  /* agrega la clase disabled si el dcumento ha sido cerrado */
  const cerrado = (turno !== 'cerrado') ? null : 'disabled'


  return (
    <div className='container'>
      <div className="col-12 col-md-12">
        <div className="row justify-content-end mt-2">
          <BtnVolver />
        </div>
      </div>
      <div className="col-12 col-md-12">
        <ul className="nav nav-tabs mb-3 mt-2" id="pills-tab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active nav-link-adjust" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Información</a>
          </li>
          <li className="nav-item">
            <a className="nav-link nav-link-adjust" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Etapas</a>
          </li>
          <li className="nav-item" >
            <a className="nav-link nav-link-adjust" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Documentos</a>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          {/* INFORMACION PROYECTO */}
          <div className="tab-pane fade " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
            {(dataProject === '') ? null : <InfoProject info={dataProject} actualizarInfoProject={actualizarInfoProject} />}
          </div>
          {/* ETAPAS */}
          <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            <h1 className='textCenter'>ETAPAS</h1>
            <div className="col-12 personalV">
              <Button
                color='primary'
                variant="contained"
                size='medium'
                startIcon={<AddIcon />}
              // onClick={() => addEtapa()}
              >
                Añadir Etapa
              </Button>
            </div>

            <br />
            <br />

            {/* por cada etapa, un componente Etapa*/}
            {(etapas.length > 0) ? etapas.map((data, index) => {
              return (
                <EtapasRemaster
                  key={index + '-' + data.id}
                  index={index}
                  data={data}
                // updateEtapa={updateEtapa}
                // setEtapa={setEtapas}
                // removeEtapa={removeEtapa}
                />
              )
            }) : null
            }
          </div>

          {/* DOCUMENTOS */}
          <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <div>
              <OffCanvas
                transitionDuration={300}
                isMenuOpened={isMenuOpened}
                position={"right"}
                effect={"overlay"}
              >
                <OffCanvasBody>

                  <h1>Subir documento</h1>
                  {/* BOTONERA SUBIR DOCUMENTO */}
                  <div className='container mb-5'>
                    <div class="row justify-content-md-end personalR">
                      <BtnSubirDocumento
                        subirDocumento={subirDocumento}
                      />
                    </div>
                  </div>

                  <ul className="list-group mb-5" onClick={openMenu}>
                    {/* por cada documento contenido en el proyecto */}
                    {(documentos.length > 0) ? documentos.map((data, index) => {
                      {/* si es par, manda color, si es non, no manda color */ }
                      let color = (index % 2 === 0) ? true : false;
                      return (
                        <Documentos
                          getCommits={getCommits}
                          key={index}
                          info={data}
                          color={color}
                        />
                      )
                    }) : null}
                  </ul>

                  {/* MENU LATERAL DE COMENTARIOS */}
                </OffCanvasBody>
                <OffCanvasMenu className={styleMenuComits}>
                  <div>
                    <button
                      onClick={closeMenu}
                      className='btn btn-danger'
                    >
                      Cerrar
                      </button>
                  </div>

                  <div className={"comentariosDocumentos"}>
                    {(comentariosDocumento !== '') ? comentariosDocumento.map((info) => {
                      return (
                        <Comentarios info={info} />
                      )
                    }) : "...Sin Comentarios Aun..."
                    }
                  </div>
                  <div className='mt-3 align-content-center'>
                    <h3>Turno: ({turno})</h3>
                    <DocumentoAcciones
                      tunarDocumento={tunarDocumento}
                      cerrado={cerrado}
                    />
                  </div>
                </OffCanvasMenu>
              </OffCanvas>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Project;
