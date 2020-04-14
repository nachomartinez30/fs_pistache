import React from 'react'


const Documentos = ({ info, getCommits, color }) => {
    const classColor = (color) ? 'list-group-item-secondary' : null;
    return (
        <li className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${classColor}`}
            onClick={() => getCommits(info.id)}
        >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{info.titulo}</h5>
                <p className='ml-2 mt-2'><b>Autor: </b>{info.autor}</p>
                <small className='mx-2 my-2'>{info.fecha}</small>
            </div>
            {/* <span className="badge badge-primary badge-pill">{(typeof info.comentarios.length != 'undefined') ? info.comentarios.length : null}</span> */}
        </li>

    )
}

export default Documentos
