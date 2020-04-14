import React from 'react'


const ConfigEtapas = () => {
    return (
        <div>
            <h1 className='textCenter'>Configuracion de Etapas</h1>
            <div className='row'>
                <label>Numero de etapas:</label>
                <input
                    className='form-control'
                    type='number'
                    placeholder='ej.5' />
            </div>
        </div>
    )
}

export default ConfigEtapas
