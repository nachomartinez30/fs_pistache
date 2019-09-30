import React, { /* Component,  */useState, useEffect } from 'react'
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { stat } from 'fs';
import { log } from 'util';
// const server = "http://localhost:3002/";
const server = "https://jsonplaceholder.typicode.com/";


// class TablaProyectos extends Component {

//     constructor(props) {
//         super(props)

//         this.state = {
//             articulos: []
//         }
//     }

//     componentDidMount() {
//         const API = `${server}posts`
//         const promesa = fetch(API)
//         promesa.then((response) => {
//             response.json().then((data) => {
//                 this.setState({
//                     articulos: data
//                 })
//             })
//         })
//     }

//     render() {
//         return (
//             <div>
//                 <h1>Tabla Proyectos</h1>
//                 {this.state.articulos.map((item) => <p>{item.title}</p>)}
//             </div>
//         )
//     }
// }

const TablaProyectos = () => {
    const API = `${server}posts`
    const [contador, setContador] = useState(0)


    return (
        <div>
            <h1>Contador {contador}</h1>
            <button onClick={()=>{setContador(contador+1)}}>Aumentar</button>
        </div>
    )
}

export default TablaProyectos