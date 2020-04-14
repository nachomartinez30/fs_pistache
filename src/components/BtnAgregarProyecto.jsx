import React from 'react'
import { Link } from 'react-router-dom'
import { AddBox } from '@material-ui/icons'
import { Fab } from '@material-ui/core'


const BtnAgregarProyecto = () => {
    return (
        
        <Link to='/new_project'>
            <Fab color="primary" aria-label="add">
                <AddBox />
             </Fab>
        </Link>
    )
}
export default BtnAgregarProyecto;