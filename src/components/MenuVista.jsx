import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/* ICONOS */
import ViewCarouselRoundedIcon from '@material-ui/icons/ViewCarouselRounded';
import ViewModuleIcon from '@material-ui/icons/ViewModule';




const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const MenuVista = ({ changeView, view }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                {(view !== 'cards') ?
                    <ViewModuleIcon fontSize="large" /> :
                    <ViewCarouselRoundedIcon fontSize="large" />}
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={() => changeView('cards')}>
                    <ListItemIcon>
                        <ViewCarouselRoundedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cards" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => changeView('table')}>
                    <ListItemIcon>
                        <ViewModuleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Tabla" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
export default MenuVista;