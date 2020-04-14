import React from 'react'
import { Link } from "react-router-dom";

import logo_cc from "../assets/img/conacyt.png";
import logo_cnf_2 from "../assets/img/conafor.png";
// import logo_conacyt from "../assets/img/logo_conacyt.jpg";
const action = '/main';
const method = null;

const Login = ({ setLoged }) => {


    const enviarInfo = () => {
        setLoged(true);
    }

    return (
        <div>
            <div className="cotainer fullContainer">
                <div className="row justify-content-center no-gutters">
                    <div className='row justify-content-center no-gutters logos upDownMargin'>
                        <div className='col-4 col-md-2'><img alt="Logotipo Conacyt" className='img-fluid' src={logo_cc}></img></div>
                        <div className='col-4 col-md-2'><img alt="Logotipo Conafor" className='img-fluid' src={logo_cnf_2}></img></div>
                    </div>
                    <div className="col-11 col-md-6 bordes">
                        <div className="card login-card">
                            <div className="login-cabecera">Acceso</div>
                            <div className="card-body">
                                <form action={action} method={method} onSubmit={enviarInfo}>
                                    <div className="form-group row">
                                        <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">Usuario</label>
                                        <div className="col-md-6">
                                            <input type="text" id="email_address" className="form-control" value='desarrolloit@conafor.gob.mx' name="email-address" required autoFocus />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Contraseña</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password" className="form-control" value='conaforsistemas' name="password" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" /> Recordarme
                                                </label>
                                            </div>
                                            <Link to='/main'>
                                                <button onClick={enviarInfo} className='btn btn-primary'>Ingresar</button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login