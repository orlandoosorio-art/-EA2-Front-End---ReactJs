import React, { useState, useEffect } from 'react';
import { getDirectores, crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';

export const DirectorView = () => {
    const [directores, setDirectores] = useState([]);
    const [valoresForm, setValoresForm] = useState({
        nombre: '', // Cambiado de 'nombres' a 'nombre'
        estado: 'Activo'
    });

    const { nombre, estado } = valoresForm;

    const listarDirectores = async () => {
        try {
            const { data } = await getDirectores();
            setDirectores(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarDirectores();
    }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            await crearDirector(valoresForm);
            Swal.close();
            setValoresForm({ nombre: '', estado: 'Activo' });
            listarDirectores();
        } catch (error) {
            console.log(error);
            Swal.close();
            Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
        }
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5>Agregar Director</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleOnSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="nombre" // Cambiado a 'nombre'
                                        value={nombre} 
                                        onChange={handleOnChange} 
                                        className="form-control" 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Estado</label>
                                    <select 
                                        name="estado" 
                                        value={estado} 
                                        onChange={handleOnChange} 
                                        className="form-select"
                                    >
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success w-100">Guardar</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Estado</th>
                                <th>Fecha Creación</th>
                            </tr>
                        </thead>
                        <tbody>
                            {directores.map((director, index) => (
                                <tr key={director._id || index}>
                                    <td>{index + 1}</td>
                                    <td>{director.nombre || director.nombres}</td>
                                    <td>
                                        <span className={`badge ${director.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                                            {director.estado}
                                        </span>
                                    </td>
                                    <td>{director.fechaCreacion ? new Date(director.fechaCreacion).toLocaleDateString() : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};