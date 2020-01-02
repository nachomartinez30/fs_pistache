import React from 'react'

const FrmCommits = ({ data }) => {
    return (
        <div>
            <div className={"comentariosDocumentos list-group"}>

                <h5 href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{data.autor}</h5>
                        <small className="text-muted">{data.date}</small>
                    </div>
                    <p className="mb-1">{data.comentario}</p>
                    <small className="text-muted">Donec id elit non mi porta.</small>
                </h5>
               
            </div>
            {/* BOTONERA  COMENTARIOS*/}
            <textarea placeholder='comentar'></textarea>
            <button>Enviar</button>
        </div>
    )
}

export default FrmCommits;