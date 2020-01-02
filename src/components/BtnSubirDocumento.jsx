import React from 'react'
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => (
    {
        extendedIcon: { marginRight: theme.spacing(1) }
    }
));

const BtnSubirDocumento = ({ subirDocumento }) => {
    /* clases estilos para material UI */
    const classes = useStyles();

    return (
        <Fab color="secondary"
            variant="extended"
            onClick={() => subirDocumento()}
        >
            <NavigationIcon className={classes.extendedIcon} />
            Subir Documento
    </Fab>
    )
}

export default BtnSubirDocumento