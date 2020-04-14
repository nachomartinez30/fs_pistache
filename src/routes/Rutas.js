import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from '../containers/Main';
import Login from '../components/Login';
// import SideBarNavigation from '../components/SideBarNavigation';
import Project from "../containers/Project";
import MetaTags from "react-meta-tags";
import NotFound from '../components/NotFound';
import NewProject from '../containers/NewProject';
import Help from '../containers/Help';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* Estilos baterial bootstrap */
import 'mdbreact/dist/css/mdb.css';


const Rutas = () => {
    const [loged, setLoged] = useState(true)

    return (
        <BrowserRouter>
            <Header
                loged={loged}
                setLoged={setLoged}
            />
            <MetaTags>
                <title>Fondo Sectorial</title>
                <meta id="meta-description" name="description" content="Información del Fondo Sectorial" />
                <meta id="og-title" property="og:title" content="MyApp" />
                <link href="../assets/img/favicon.ico" rel="shortcut icon"></link>
            </MetaTags>
            <Switch>
                <Route exact path="/"
                    render={() => (<Login
                        setLoged={setLoged}
                    />)}
                />
                <Route exact path="/main" component={Main} />
                <Route exact path="/new_project" component={NewProject} />
                <Route exact path="/project/:id_proyecto" component={Project} />
                <Route exact path="/help" component={Help} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
};

export default Rutas