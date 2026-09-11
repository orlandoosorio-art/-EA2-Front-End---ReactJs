import React, { useState, useEffect } from 'react';
import { getTipos, crearTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const TipoView = () => {
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const { nombre, descripcion } = formData;

  const listarTipos = async () => {
    try {
      Swal.showLoading();
      const { data } = await getTipos();
      setTipos(data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudieron cargar los tipos', 'error');
    }
  };

  useEffect(() => {
    listarTipos();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.showLoading();
      await crearTipo(formData);
      setFormData({ nombre: '', descripcion: '' });
      listarTipos();
      Swal.close();
      Swal.fire('Éxito', 'Tipo creado correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'Ocurrió un error al crear el tipo', 'error');
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header"><h5>Crear Tipo</h5></div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" value={nombre} onChange={handleOnChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea name="descripcion" value={descripcion} onChange={handleOnChange} className="form-control" rows="2"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((tipo, index) => (
                <tr key={tipo._id || index}>
                  <td>{index + 1}</td>
                  <td>{tipo.nombre}</td>
                  <td>{tipo.descripcion || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};