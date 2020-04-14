import React from 'react'

 const Comentarios = ({info}) => {
    return (
        <p className="list-group-item">
            <h5 className="mb-1">{info.autor}</h5>
            <p className="mb-1">{info.descripcion}</p>
            <small className="text-muted">{info.date}</small>
        </p>
    )
}

export default Comentarios