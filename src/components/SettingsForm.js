import React, { useState } from 'react';
import './styles.css';

const SettingsForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    profilePicture: null,
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    twoFactor: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al backend
    console.log(formData);
  };

  return (
    <div className="container">
      <h1>Configuración de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">Nombre:</label>
        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

        <label htmlFor="lastName">Apellido:</label>
        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

        <label htmlFor="profilePicture">Foto de Perfil:</label>
        <input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} />

        <label htmlFor="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="phone">Teléfono:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

        <label htmlFor="twoFactor">Activar Verificación en Dos Pasos:</label>
        <input type="checkbox" id="twoFactor" name="twoFactor" checked={formData.twoFactor} onChange={handleChange} />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default SettingsForm;
