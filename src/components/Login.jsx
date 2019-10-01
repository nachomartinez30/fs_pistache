import React, { Component } from 'react'
import logo_cnf from "../assets/img/logo_cnf.jpg";
// import logo_conacyt from "../assets/img/logo_conacyt.jpg";
const action = null;
const method = null;

export default class Login extends Component {
    render() {
        return (
            <div className="cotainer">
                <div className="row justify-content-center">
                    <div className='logos'>
                        <img src={logo_cnf}></img>
                    </div>
                    <div className="col-md-8 bordes">
                        <div className="card login-card">
                            <div className="login-cabecera">Acceso</div>
                            <div className="card-body">
                                <form action={action} method={method}>
                                    <div className="form-group row">
                                        <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">Usuario</label>
                                        <div className="col-md-6">
                                            <input type="text" id="email_address" className="form-control" name="email-address" required autofocus />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Contraseña</label>
                                        <div className="col-md-6">
                                            <input type="password" id="password" className="form-control" name="password" required />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" /> Recordarme
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
