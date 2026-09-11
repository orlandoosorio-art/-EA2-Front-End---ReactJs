import React, { useState, useEffect } from 'react';
import { getGeneros, crearGenero } from '../../services/generoService';
import Swal from 'sweetalert2';

export const GeneroView = () => {
  const [generos, setGeneros] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    descripcion: ''
  });

  const { nombre, estado, descripcion } = formData;

  const listarGeneros = async () => {
    try {
      Swal.showLoading();
      const { data } = await getGeneros();
      setGeneros(data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudieron cargar los géneros', 'error');
    }
  };

  useEffect(() => {
    listarGeneros();
  }, []);

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'warning');
      return;
    }
    try {
      Swal.showLoading();
      await crearGenero(formData);
      setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
      listarGeneros();
      Swal.fire('Éxito', 'Género creado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Formulario */}
        <div className="col-md-4 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Agregar Género</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={nombre}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-select"
                    name="estado"
                    value={estado}
                    onChange={handleOnChange}
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleOnChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="col-md-8">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Descripción</th>
                  <th>Fecha Creación</th>
                </tr>
              </thead>
              <tbody>
                {generos.map((genero, index) => (
                  <tr key={genero._id || index}>
                    <td>{index + 1}</td>
                    <td>{genero.nombre}</td>
                    <td>
                      <span className={`badge ${genero.estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                        {genero.estado}
                      </span>
                    </td>
                    <td>{genero.descripcion}</td>
                    <td>{new Date(genero.fechaCreacion).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};