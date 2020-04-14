import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
/* Iconos */
import { ExitToApp, } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

const useStyles = makeStyles({
    list: {
        width: '100%',
    },
    fullList: {
        width: '25%',
    },
});

const SideBarNavigation = ({ setLoged }) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            // className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem button key='Proyectos'>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <Link to='/main'>
                        <ListItemText primary='Proyectos' />
                    </Link>
                </ListItem>
                <ListItem button key='Nuevo_Proyecto'>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <Link to='/new_project'>
                        <ListItemText primary='Nuevo Proyecto' />
                    </Link>
                </ListItem>
                <ListItem button key='Cerrar sesion'>
                    <ListItemIcon>
                        <ExitToApp />
                    </ListItemIcon>
                    <Link to='/'>
                        <ListItemText onClick={() => setLoged(false)} primary='Cerrar sesion' />
                    </Link>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className="btn-group floatButton row justify-content-end">
            <button
                onClick={toggleDrawer('left', true)}
                type="button"
                className="btn btn-blanco btn-adjust">
                <MenuRoundedIcon fontSize='large' />
            </button>
            {/* <button className="dropdown-item" type='button' onClick={toggleDrawer('left', true)}>Menú</button> */}
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
            {/* <Link to='/'><button onClick={() => setLoged(false)} className="dropdown-item" type="button">Cerrar Sesión</button></Link> */}
            {/* <Button>Cerrar sesión</Button> */}

        </div>
    );
}

export default SideBarNavigation;