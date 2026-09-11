import React, { useState, useEffect } from 'react';
import { getProductoras, crearProductora } from '../../services/productoraService';
import Swal from 'sweetalert2';

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'Activo',
    slogan: '',
    descripcion: ''
  });

  const { nombre, estado, slogan, descripcion } = formData;

  const listarProductoras = async () => {
    try {
      Swal.showLoading();
      const { data } = await getProductoras();
      setProductoras(data);
      Swal.close();
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudieron cargar las productoras', 'error');
    }
  };

  useEffect(() => {
    listarProductoras();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.showLoading();
      await crearProductora(formData);
      setFormData({ nombre: '', estado: 'Activo', slogan: '', descripcion: '' });
      listarProductoras();
      Swal.close();
      Swal.fire('Éxito', 'Productora creada correctamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'Ocurrió un error al crear la productora', 'error');
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header"><h5>Crear Productora</h5></div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" name="nombre" value={nombre} onChange={handleOnChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Slogan</label>
                  <input type="text" name="slogan" value={slogan} onChange={handleOnChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea name="descripcion" value={descripcion} onChange={handleOnChange} className="form-control" rows="2"></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select name="estado" value={estado} onChange={handleOnChange} className="form-select">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
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
                <th>Slogan</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {productoras.map((prod, index) => (
                <tr key={prod._id || index}>
                  <td>{index + 1}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.slogan || 'N/A'}</td>
                  <td>{prod.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};