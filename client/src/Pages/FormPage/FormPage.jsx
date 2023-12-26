import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDriver } from '../../Redux/Actions/Actions';

function FormPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    // Agrega el resto de los campos del formulario aquí
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de validación del formulario aquí

    // Llamada a la acción para crear un nuevo conductor
    dispatch(createDriver(formData));

    // Limpia el formulario después de enviar los datos
    setFormData({
      name: '',
      // Restablece el resto de los campos del formulario aquí
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Crea un nuevo Piloto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {/* Agrega el resto de los campos del formulario aquí */}
        <button type="submit">Crear Piloto</button>
      </form>
    </div>
  );
}

export default FormPage;