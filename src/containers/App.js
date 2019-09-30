import '../assets/styles/styles.css'
import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TablaProyectos from '../components/TablaProyectos'
import Login from '../components/Login'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>

                <Login />

                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}
