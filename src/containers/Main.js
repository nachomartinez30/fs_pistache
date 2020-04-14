/* LIBRERIAS */
import '../assets/styles/styles.css';
import "material-design-icons";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios'
import lodash from "lodash";
/* COMPONTES */
import React, { useState, useEffect } from 'react';

import TablaProyectos from "../components/TablaProyectos";
import BtnAgregarProyecto from "../components/BtnAgregarProyecto";
import { Input } from "reactstrap";
import CardsProyectos from '../components/CardsProyectos'
import MenuVista from '../components/MenuVista';
import AlertError from '../components/AlertError';




const Main = () => {

    const [view, setView] = useState('cards');
    const [proyectos, setProyectos] = useState([]);
    const [proyectosSearched, setProyectosSearched] = useState([]);
    const [reloadProjects, setReloadProjects] = useState(true);

    useEffect(() => {
        /* si se necesita recargar proyectos */
        if (reloadProjects) {
            getProyectos();
        }

        /* se reinicia el estado para no crear un loop */
        setReloadProjects(false)

    }, [reloadProjects])

    const changeView = (value) => {
        // obtiene el valor del objetivo que se le pasa
        let tipoVista = value;
        /* actualiza el estado */
        setView(tipoVista);
    }

    const recargarProyectos = () => {
        console.log('Recargando proyectos')
        setReloadProjects(true)
    }

    const buscarEnProyecto = (event) => {
        event.preventDefault();
        // toma el valor del input
        let searchWord = event.target.value;
        /* lo convertimos a minusculas jutno con los valores de  */
        searchWord = searchWord.toLowerCase();
        let resp = lodash.filter([...proyectos], (arr) => {

            /* previene que sean nulos */
            arr.cve_proyecto = (arr.cve_proyecto === null) ? '' : arr.cve_proyecto;
            arr.titulo = (arr.titulo === null) ? '' : arr.titulo;
            arr.responsable_tecnico = (arr.responsable_tecnico === null) ? '' : arr.responsable_tecnico;
            arr.responsable_admin = (arr.responsable_admin === null) ? '' : arr.responsable_admin;
            arr.acuerdo = (arr.acuerdo === null) ? '' : arr.acuerdo;
            arr.link_acuerdo = (arr.link_acuerdo === null) ? '' : arr.link_acuerdo;
            arr.institucion_responsable = (arr.institucion_responsable === null) ? '' : arr.institucion_responsable;
            arr.fecha_fin = (arr.fecha_fin === null) ? '' : arr.fecha_fin;
            arr.fecha_inicio = (arr.fecha_inicio === null) ? '' : arr.fecha_inicio;
            arr.contacto1 = (arr.contacto1 === null) ? '' : arr.contacto1;
            arr.contacto2 = (arr.contacto2 === null) ? '' : arr.contacto2;
            arr.contacto3 = (arr.contacto3 === null) ? '' : arr.contacto3;
            arr.estatus = (arr.estatus === null) ? '' : arr.estatus;
            arr.semaforo = (arr.semaforo === null) ? '' : arr.semaforo;
            arr.carta_finiquito = (arr.carta_finiquito === null) ? '' : arr.carta_finiquito;
            arr.area_usuaria = (arr.area_usuaria === null) ? '' : arr.area_usuaria;
            arr.monto_total_autorizado = (arr.monto_total_autorizado === null) ? '' : arr.monto_total_autorizado;
            arr.monto_total_ejercido = (arr.monto_total_ejercido === null) ? '' : arr.monto_total_ejercido;
            arr.procentaje_uso = (arr.procentaje_uso === null) ? '' : arr.procentaje_uso;

            return (
                arr.cve_proyecto.toLowerCase().includes(searchWord) ||
                arr.titulo.toLowerCase().includes(searchWord) ||
                arr.responsable_tecnico.toLowerCase().includes(searchWord) ||
                arr.responsable_admin.toLowerCase().includes(searchWord) ||
                arr.acuerdo.toLowerCase().includes(searchWord) ||
                arr.link_acuerdo.toLowerCase().includes(searchWord) ||
                arr.institucion_responsable.toLowerCase().includes(searchWord) ||
                arr.fecha_fin.toLowerCase().includes(searchWord) ||
                arr.fecha_inicio.toLowerCase().includes(searchWord) ||
                arr.contacto1.toLowerCase().includes(searchWord) ||
                arr.contacto2.toLowerCase().includes(searchWord) ||
                arr.contacto3.toLowerCase().includes(searchWord) ||
                arr.estatus.toLowerCase().includes(searchWord) ||
                arr.semaforo.toLowerCase().includes(searchWord) ||
                arr.carta_finiquito.toLowerCase().includes(searchWord) ||
                arr.area_usuaria.toLowerCase().includes(searchWord) ||
                arr.monto_total_autorizado.toLowerCase().includes(searchWord) ||
                arr.monto_total_ejercido.toLowerCase().includes(searchWord) ||
                arr.procentaje_uso.toLowerCase().includes(searchWord)
            )
        })

        /* aplicar los resultados si hubo coincidencias */
        if (resp) {

            setProyectosSearched(resp);
            setReloadProjects(true)
        }

    }

    const getProyectos = async () => {
        const API = 'http://187.218.230.38:81/pistache/api/projects/all';
        // const API = 'http://localhost:3001/all';

        try {
            const respuesta = await axios.get(API);
            setProyectos(respuesta.data)

        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');

            AlertError(error);
        }


    }
    /* si el proyecto filtrado o lo s proyecto s son mayores a 0 */
    let barraBusqueda = (proyectosSearched.length > 0 && proyectos.length > 0) ? true : false;

    return (
        <div className='container'>
            <div className='row mx-5 mb-2 personal'>
                {/* SELECT TIPO DE VISTA */}
                <div className='col-6 mt-3 '>
                    <MenuVista
                        view={view}
                        changeView={changeView}
                    />
                </div>
                {/* BOTON DE AGREGAR */}
                <div className='col-6 mt-3 textRight'>
                    <BtnAgregarProyecto />
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-9 '>
                    <Input className='mb-4 mt-2'
                        placeholder='Buscar...'
                        onChange={(input) => buscarEnProyecto(input)}
                    />
                </div>
            </div>
            {/* SI SELECCIONÓ VISTA CARDS */}
            {view === 'cards' &&
                <div className="row justify-content-center scrollContent">

                    {/* SI ESTAN USANDO EL SERACHBAR APLICAR EL FILTRO */}
                    {
                        (barraBusqueda) ?
                            proyectosSearched.map((data) => {
                                return <CardsProyectos
                                    key={data.id}
                                    recargarProyectos={recargarProyectos}
                                    infoProyecto={data}
                                    proyectosSearched
                                />
                            })
                            :
                            proyectos.map((data) => {
                                return <CardsProyectos
                                    key={data.id}
                                    recargarProyectos={recargarProyectos}
                                    infoProyecto={data}
                                    proyectos
                                />
                            })
                    }
                    {/* si proyecto es distinto de null */}
                </div>

            }
            {view === 'table' &&
                <TablaProyectos
                    data={proyectos}
                />
            }

        </div>
    )

}

export default Main;