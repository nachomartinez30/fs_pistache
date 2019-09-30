import '../assets/styles/styles.css'
import React, { Component } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'


export default class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>

                <h1>Hola mundo</h1>

                <div>
                    <Footer />
                </div>
            </div>
        )
    }
}
