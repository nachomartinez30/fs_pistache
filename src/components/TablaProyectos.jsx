import React from 'react'
import MaterialIcon from 'material-icons-react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom'

const TablaProyectos = (propiedades) => {

    const SearchBar = (props) => {
        let input;
        const handleClick = () => {
            props.onSearch(input.value);
        };
        return (
            <div className='container'>
                <input
                    onChange={handleClick}
                    className="buscador form-control"
                    placeholder='Buscar...'
                    ref={n => input = n}
                    type="text"
                />
            </div>
        );
    };
    const ACTIONS_FORMAT = (cellContent, row) => {
        return (
            <React.Fragment>
                <Link to={'/project/' + row.id}>
                    <button className='btn btn-sm btn-outline-info botonesMain'>
                        <MaterialIcon icon="visibility" color='#2B7ECC' size='small' />
                    </button>
                </Link>
                <Link to={'/project/' + row.id}>
                    <button className='btn btn-sm btn-outline-success botonesMain'>
                        <MaterialIcon icon="edit" color='#35CC2B' size='small' />
                    </button>
                </Link>
                <Link to={'/project/' + row.id}>
                    <button className='btn btn-sm btn-outline-danger botonesMain'>
                        <MaterialIcon icon="delete" color='#A31C45' size='small' />
                    </button>
                </Link>
            </React.Fragment>
        )
    }

    const RIESGO_FORMAT = (cellContent, row) => {
        let color = '#ffff';
        let icon = 'invert_colors'
        switch (row.semaforo) {
            case 'bajo':
                color = '#00CC00'
                icon = 'fiber_manual_record'
                break;
            case 'medio':
                color = '#FFE800'
                icon = 'fiber_manual_record'
                break;
            case 'alto':
                color = '#FF0000'
                icon = 'fiber_manual_record'
                break;

            default:
                break;
        }
        return (<div className='textCenter' ><MaterialIcon icon={icon} color={color} size={45} /></div>)
    }


    const opcionesSemaforo = {
        'bajo': 'Bajo',
        'medio': 'Medio',
        'alto': 'Alto'
    };
    const FILTRO_SEMAFORO = {
        options: opcionesSemaforo,
        defaultValue: null,
        placeholder: '---Todos---',
        className: ''
    }
    const opcionesEstado = {
        'vigente': 'Vigente',
        'concluido': 'Concluido',
        'cancelado': 'Cancelado'
    };

    // const FILTRO_ESTADO = {
    //     options: opcionesEstado,
    //     defaultValue: null,
    //     placeholder: '---Todos---',
    //     className: ''
    // }


    const columns = [
        //{ dataField: 'id', text: 'ID', classes: () => 'desbordeTexto' },
        {
            dataField: "cve_proyecto", text: "CVE PROYECTO", classes: () => 'desbordeTexto textCenter vAlign', sort: true, headerClasses: 'desbordeTexto textCenter align-top', filter: textFilter({
                placeholder: 'Buscar...'
            })
        },
        { dataField: "titulo", text: "TITULO", classes: () => 'desbordeTexto textCenter overflowScroll', headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: "institucion_responsable", text: "INSTITUCIÓN RESPONSABLE", classes: () => 'desbordeTexto textCenter', headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: "fecha_inicio", text: "FECHA INICIO", classes: () => 'desbordeTexto textCenter', headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: "fecha_fin", text: "FECHA FIN", classes: () => 'desbordeTexto textCenter', headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: "monto_total_autorizado", text: "MONTO AUTORIZADO", classes: () => 'desbordeTexto textCenter', headerClasses: 'desbordeTexto textCenter align-top' },
        {
            dataField: "monto_total_ejercido", text: "MONTO EJERCIDO", classes: () => 'desbordeTexto textCenter', sort: true, headerClasses: 'desbordeTexto textCenter align-top', filter: textFilter({
                placeholder: 'Buscar...'
            })
        },
        {
            dataField: "semaforo",
            text: "RIESGO",
            sort: true,
            headerClasses: 'desbordeTexto textCenter align-top',
            formatter: RIESGO_FORMAT,
            filter: selectFilter(FILTRO_SEMAFORO)
        },
        { dataField: "estatus", text: "ESTATUS", classes: () => 'desbordeTexto textCenter', sort: true, headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: "acuerdo", text: "ACUERDO", classes: () => 'desbordeTexto textCenter', sort: true, headerClasses: 'desbordeTexto textCenter align-top' },
        { dataField: 'df2', isDummyField: true, classes: () => 'textCenter', text: 'Acciones', formatter: ACTIONS_FORMAT, headerClasses: 'desbordeTexto textCenter align-top' }
    ];

    // const API = 'http://10.0.75.1:3001/all'
    const data = propiedades.data

    const customTotal = (from, to, size) => (
        <h5 className="react-bootstrap-table-pagination-total">
            Mostrando <b className={'rojo'}>{to}</b> de <b className={'rojo'}>{size}</b> resultados
        </h5>
    );

    const paginacionSetting = {
        // alwaysShowAllBtns: true, // Always show next and previous button
        // withFirstAndLast: false, // Hide the going to First and Last page button
        // hideSizePerPage: true, // Hide the sizePerPage dropdown always
        // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'Primer',
        prePageText: 'Atras',
        nextPageText: 'Siguiente',
        lastPageText: 'Ultima',
        nextPageTitle: 'Primera página',
        prePageTitle: 'Pre-página',
        firstPageTitle: 'Siguiente página',
        lastPageTitle: 'Ultima página',
        showTotal: true,
        custom: true,
        totalSize: data.length,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'Todos', value: data.length
        }] // A numeric array is also available. the purpose of above example is custom the text
    };

    const InfoPaginacion = (propiedades) => <PaginationTotalStandalone
        {...propiedades}
    />

    const Paginas = (propiedades) => <PaginationListStandalone
        {...propiedades}
    />

    const contenidoTabla = ({ paginationProps, paginationTableProps }) => (
        <div>
            <ToolkitProvider
                keyField="id"
                columns={columns}
                data={data}
                bootstrap4
                search
            >{
                    (toolkitprops) => (
                        <div>
                            <SearchBar {...toolkitprops.searchProps} />
                            <br />
                            <div className='row'>
                                <div className='col-md-6 col-12 alignResultados margenes'>{InfoPaginacion(paginationProps)}</div>
                                <div className='col-md-6 col-12'>{Paginas(paginationProps)}</div>
                            </div>
                            <BootstrapTable
                                filter={filterFactory()}
                                classes={'tablaResponsive fontSize'}
                                {...toolkitprops.baseProps}
                                {...paginationTableProps}
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )

    return (
        <div>
            <PaginationProvider
                pagination={
                    paginationFactory(paginacionSetting)
                }
            >
                {contenidoTabla}
            </PaginationProvider>
        </div>
    )
}

export default TablaProyectos;