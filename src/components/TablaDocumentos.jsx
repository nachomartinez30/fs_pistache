import React, { Component } from 'react'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

export default class TablaDocumentos extends Component {
    render() {
        const documentos = this.props.info
        const columns = [
            { dataField: 'emisor', text: "Emisor", headerClasses: 'desbordeTexto', classes: () => 'desbordeTexto' },
            {
                dataField: 'titulo', text: "Titulo", headerClasses: 'desbordeTexto', classes: () => 'desbordeTexto', formatter: (cell, row, rowIndex, extraData) => {
                    return (<a href={row.source} target="_blank" >{row.titulo}</a>)
                }
            },
            { dataField: 'descripcion', text: "Descripcion", headerClasses: 'desbordeTexto', classes: () => 'desbordeTexto' },
        ]

        return (
            <div>
                <BootstrapTable
                    classes={'tablaResponsive'}
                    bootstrap4
                    keyField="id"
                    data={documentos}
                    columns={columns}
                />
            </div>
        )
    }
}
