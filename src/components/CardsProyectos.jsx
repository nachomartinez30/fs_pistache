import React, { useState } from 'react'
import MaterialIcon from 'material-icons-react';
import AlertError from './AlertError'
import AlertConfirm from './AlertConfirm'
import axios from 'axios'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from 'react-router-dom'
import { Collapse, Button, CardBody, Card, Tooltip } from 'reactstrap';

const CardsProyecto = ({ infoProyecto, recargarProyectos }) => {
	const [collapse, setCollapse] = useState(false);

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggleeOpen = () => setTooltipOpen(!tooltipOpen);

	const [tooltipEdit, setTooltipEdit] = useState(false);
	const toggleeEdit = () => setTooltipEdit(!tooltipEdit);

	const [tooltipView, setTooltipView] = useState(false);
	const toggleeView = () => setTooltipView(!tooltipView);

	const [tooltipDelete, setTooltipDelete] = useState(false);
	const toggleeDelete = () => setTooltipDelete(!tooltipDelete);

	const [status, setStatus] = useState('Cerrado');
	const onEntering = () => setStatus('Abriendo...');
	const onEntered = () => setStatus('Abierto');
	const onExiting = () => setStatus('Cerrando...');
	const onExited = () => setStatus('Cerado');
	const toggle = () => setCollapse(!collapse);

	const getRiesgo = (semaforo) => {
		let riesgo = null
		switch (semaforo) {
			case 'bajo':
				riesgo = 'riesgoV';
				break;
			case 'medio':
				riesgo = 'riesgoA';
				break;
			case 'alto':
				riesgo = 'riesgoR';
				break;
			default:
				break;
		}
		return riesgo
	}



	const deletProject = async (idProyecto) => {

		const API = `http://localhost/pistache/api/project/${idProyecto}`;
		/* enviar por axios el id del proyecto */
		try {
			const resp = await axios.delete(API)
			/* si respuesta 200 retorna true */
			let status = (resp.status === 200) ? true : false;
			recargarProyectos()
			return status
		} catch (error) {
			AlertError('(Delete Project) ' + error);
		}
	}

	const eliminarProyecto = (idProject) => {
		try {
			AlertConfirm(deletProject, idProject)
			/* refresh de los proyectos */

		} catch (err) {
			AlertError('(Delete Project) ' + err)
		}
	}

	const acuerdo = infoProyecto.acuerdo
	const cve_proyecto = infoProyecto.cve_proyecto
	const fecha_fin = infoProyecto.fecha_fin
	const fecha_inicio = infoProyecto.fecha_inicio
	const id = infoProyecto.id
	const institucion_responsable = infoProyecto.institucion_responsable
	const monto_total_autorizado = infoProyecto.monto_total_autorizado
	const semaforo = infoProyecto.semaforo
	const titulo = infoProyecto.titulo
	const riesgo = getRiesgo(semaforo)


	return (
		<div className="col-md-4 bottomMargin">
			<Card>
				<div className="card-header textCenter">
					<Button className="col-md-12 col-12 close textRightForce" color="link" onClick={toggle}><small id="abrirCerrar"><i className="material-icons">iso</i>{/*Estado actual: {status}*/}</small></Button>
					<Tooltip
						// key={props}
						placement="top"
						isOpen={tooltipOpen}
						autohide={false}
						target="abrirCerrar"
						toggle={toggleeOpen}>
						Abrir / Cerrar
					</Tooltip>
					<h6>TITULO:</h6><b><i>{titulo}</i></b>
					<hr className='separadorGris' />
					<div className="col-md-12 col-12 row justify-content-center">
						<div className="col-md-6 col-6">
							<div value="" type="text" className="w100 textCenter align-middle"><i className={`material-icons ${riesgo}`}>lens</i><br /><small>RIESGO </small></div>
						</div>
						<div className="col-md-6 col-6">
							<label value="" type="text" className="borders w100 vigenciaV">vigente</label>
						</div>
					</div>
				</div>
				<Collapse isOpen={collapse} onEntering={onEntering} onEntered={onEntered} onExiting={onExiting} onExited={onExited}>
					<CardBody>
						<div className="row">
							<div className="col-md-12 col-12">
								<h5>INSTITUCIÓN RESPONSABLE</h5>
								<label value="" type="text" className="borders w100">{institucion_responsable}</label>
							</div>
							<div className="col-md-12 col-12">
								<h5>CVE PROYECTO</h5>
								<label value="" type="text" className="borders w100">{cve_proyecto}</label>
							</div>
							<div className="col-md-12 col-12">
								<h5>FECHA DE INICIO-FIN</h5>
								<label value="" type="text" className="borders w100">{fecha_inicio} - {fecha_fin}</label>
							</div>
							<div className="col-md-12 col-12">
								<h5>MONTO AUTORIZADO</h5>
								<label value="" type="text" className="borders w100">${monto_total_autorizado}</label>
							</div>
							<div className="col-md-12 col-12">
								<h5>ACUERDO</h5>
								<label value="" type="text" className="borders w100">{acuerdo}</label>
							</div>
						</div>
					</CardBody>
				</Collapse>
				<div className="card-footer">
					<div className="row">
						<div className="col-md-12 col-12">
							<h5>ACCIONES</h5>
						</div>
						<React.Fragment>
							<div className="col-md-4 col-4">
								<Link to={''}>
									<button className='btn btn-sm btn-primary botonesMain' id="preVisualizar">
										<MaterialIcon icon="visibility" color='#FFF' size='small' />
									</button>
									<Tooltip
										// key={props}
										placement="bottom"
										isOpen={tooltipView}
										autohide={false}
										target="preVisualizar"
										toggle={toggleeView}>
										Visualizar
									</Tooltip>
								</Link>
							</div>
							<div className="col-md-4 col-4">
								<Link to={'/project/' + id}>
									<button className='btn btn-sm btn-success botonesMain' id='editarProyecto'>
										<MaterialIcon icon="edit" color='#FFF' size='small' />
									</button>
									<Tooltip
										// key={props}
										placement="bottom"
										isOpen={tooltipEdit}
										autohide={false}
										target="editarProyecto"
										toggle={toggleeEdit}>
										Editar
									</Tooltip>
								</Link>
							</div>
							<div className="col-md-4 col-4">
								<button
									onClick={() => eliminarProyecto(id)}
									className='btn btn-sm btn-danger botonesMain'
									id='eliminarProyecto'>
									<MaterialIcon icon="delete" color='#FFF' size='small' />
								</button>
								<Tooltip
									// key={props}
									placement="bottom"
									isOpen={tooltipDelete}
									autohide={false}
									target="eliminarProyecto"
									toggle={toggleeDelete}>
									Eliminar
									</Tooltip>
							</div>
						</React.Fragment>
					</div>
				</div>
			</Card>
		</div>
	);
}
export default CardsProyecto;