import React, { useState, useEffect } from 'react';
import { getMedias, crearMedia } from '../../services/mediaService';
import { getGeneros } from '../../services/generoService';
import { getDirectores } from '../../services/directorService';
import { getProductoras } from '../../services/productoraService';
import { getTipos } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    foto: '',
    añoEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: ''
  });

  const { serial, titulo, sinopsis, url, foto, añoEstreno, genero, director, productora, tipo } = formData;

  const CargarCatalogos = async () => {
    try {
      const [genRes, dirRes, prodRes, tipRes, medRes] = await Promise.all([
        getGeneros(),
        getDirectores(),
        getProductoras(),
        getTipos(),
        getMedias()
      ]);
      setGeneros(genRes.data.filter(g => g.estado === 'Activo'));
      setDirectores(dirRes.data.filter(d => d.estado === 'Activo'));
      setProductoras(prodRes.data.filter(p => p.estado === 'Activo'));
      setTipos(tipRes.data);
      setMedias(medRes.data);
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Error al cargar los catálogos del formulario', 'error');
    }
  };

  useEffect(() => {
    CargarCatalogos();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.showLoading();
      await crearMedia(formData);
      setFormData({
        serial: '', titulo: '', sinopsis: '', url: '', foto: '',
        añoEstreno: '', genero: '', director: '', productora: '', tipo: ''
      });
      CargarCatalogos();
      Swal.close();
      Swal.fire('Éxito', 'Película / Serie registrada exitosamente', 'success');
    } catch (error) {
      console.error(error);
      Swal.close();
      Swal.fire('Error', 'No se pudo registrar el elemento', 'error');
    }
  };

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-header"><h5>Crear Película / Serie</h5></div>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label">Serial</label>
                    <input type="text" name="serial" value={serial} onChange={handleOnChange} className="form-control" required />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label">Título</label>
                    <input type="text" name="titulo" value={titulo} onChange={handleOnChange} className="form-control" required />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">Sinopsis</label>
                  <textarea name="sinopsis" value={sinopsis} onChange={handleOnChange} className="form-control" rows="2" required></textarea>
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label">URL Película</label>
                    <input type="text" name="url" value={url} onChange={handleOnChange} className="form-control" required />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label">Año Estreno</label>
                    <input type="number" name="añoEstreno" value={añoEstreno} onChange={handleOnChange} className="form-control" required />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-label">URL Foto/Poster</label>
                  <input type="text" name="foto" value={foto} onChange={handleOnChange} className="form-control" required />
                </div>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label className="form-label">Género</label>
                    <select name="genero" value={genero} onChange={handleOnChange} className="form-select" required>
                      <option value="">Seleccione...</option>
                      {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                    </select>
                  </div>
                  <div className="col-6 mb-2">
                    <label className="form-label">Director</label>
                    <select name="director" value={director} onChange={handleOnChange} className="form-select" required>
                      <option value="">Seleccione...</option>
                      {directores.map(d => <option key={d._id} value={d._id}>{d.nombre}</option>)}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Productora</label>
                    <select name="productora" value={productora} onChange={handleOnChange} className="form-select" required>
                      <option value="">Seleccione...</option>
                      {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                    </select>
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Tipo</label>
                    <select name="tipo" value={tipo} onChange={handleOnChange} className="form-select" required>
                      <option value="">Seleccione...</option>
                      {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar Registro</button>
              </form>
            </div>
          </div>
        </div>

        {/* Tarjetas de Contenido Multimedia */}
        <div className="col-md-7">
          <div className="row row-cols-1 row-cols-md-2 g-3">
            {medias.map((m) => (
              <div className="col" key={m._id}>
                <div className="card h-100">
                  <img src={m.foto} className="card-img-top" alt={m.titulo} style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body">
                    <h5 className="card-title">{m.titulo}</h5>
                    <p className="card-text text-muted" style={{ fontSize: '0.85rem' }}>{m.sinopsis}</p>
                    <span className="badge bg-secondary me-1">{m.genero?.nombre}</span>
                    <span className="badge bg-info text-dark">{m.tipo?.nombre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};