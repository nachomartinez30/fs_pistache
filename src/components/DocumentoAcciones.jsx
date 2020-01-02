import React from 'react'

const DocumentoAcciones = ({ tunarDocumento, cerrado }) => {
    return (
        <div className="btn-group " role="group">
            <button id="btnGroupDrop1"
                type="button"
                className={"btn btn-lg btn-info dropdown-toggle " + cerrado}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <i class="material-icons align-bottom mr-2">
                    menu
                          </i>
                Acciones
                        </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                <button onClick={() => tunarDocumento()} className="dropdown-item">
                    <i class="material-icons align-bottom ">
                        call_made
                            </i>
                    Turnar</button>
                <button className="dropdown-item">Comentar</button>
            </div>
        </div>
    )
}

export default DocumentoAcciones;