import React from 'react'
import { Link } from 'react-router-dom'
/* Material Design */
import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const BtnVolver = () => {
    return (

        <Link className='personal' to='/main'>
            <Button
                variant="contained"
                color="primary"
                size='large'
                startIcon={<ArrowBackIosIcon />}
            >
                Volver
            </Button>
        </Link>
    )
}
