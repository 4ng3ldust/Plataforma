import React, { useState } from 'react';
import { useFormStore } from '../stores/useFormStore';
import './FormPreview.css'; // Importamos los estilos adicionales

const FormPreview: React.FC = () => {
  // Acceder directamente a los campos desde el store con valor por defecto
  const fields = useFormStore(state => state.fields) || [];
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // Para depuración - Descomentar si necesitas ver el estado del store
  // console.log('Estado del store:', useFormStore.getState());

  // Función para manejar cambios en los campos del formulario
  const handleFieldChange = (fieldId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  // Función para renderizar cada tipo de campo
  const renderField = (field: any) => {
    if (!field) return null;
    
    const value = formValues[field.id] || field.properties?.advanced?.defaultValue || '';
    const titleText = field.properties?.basic?.titleText || 'Campo sin título';
    const isRequired = field.properties?.validation?.required || false;
    const placeholderText = field.properties?.basic?.suggestionText || '';

    switch (field.type) {
      case 'pagina':
        return (
          <div className="form-header">
            <h2 className="text-xl font-bold">{titleText}</h2>
          </div>
        );

      case 'seccion':
        return (
          <div className="border-b border-gray-300 mb-4 pb-1">
            <h3 className="text-lg font-semibold text-gray-700">{titleText}</h3>
          </div>
        );

      case 'mensaje':
        return (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-r">
            <p className="text-sm text-blue-700">{titleText}</p>
          </div>
        );

      case 'numerico':
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <input
              type="number"
              className="field-input"
              placeholder={placeholderText}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={isRequired}
            />
          </div>
        );

      case 'fecha_hora':
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <input
              type="date"
              className="field-input"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={isRequired}
            />
          </div>
        );

      case 'opciones':
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <select
              className="field-input"
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              required={isRequired}
            >
              <option value="">Seleccionar...</option>
              {field.options?.map((option: any) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );

      case 'ubicacion':
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <div className="flex items-center">
              <div className="flex-1 border border-gray-300 rounded-md p-2 bg-gray-50 text-sm text-gray-500">
                {value || 'Sin ubicación seleccionada'}
              </div>
              <button
                className="ml-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors btn-action"
                onClick={() => handleFieldChange(field.id, 'Ubicación simulada (37.7749, -122.4194)')}
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        );

      case 'imagen':
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {value ? (
                <div className="field-image-placeholder">
                  <span>Vista previa de imagen</span>
                </div>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => handleFieldChange(field.id, 'imagen_seleccionada')}
                  type="button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-auto mb-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                  Tomar foto
                </button>
              )}
            </div>
          </div>
        );

      // Implementa los demás casos según sea necesario...

      default:
        return (
          <div className="form-field">
            <label className="field-label">
              {titleText}
              {isRequired && <span className="field-required">*</span>}
            </label>
            <div className="border border-gray-300 rounded-md p-3 bg-gray-50 text-sm text-gray-500">
              Campo tipo: {field.type}
            </div>
          </div>
        );
    }
  };

  // Función para renderizar el botón de envío del formulario
  const renderSubmitButton = () => {
    return (
      <div className="mt-6">
        <button
          type="submit"
          className="btn-submit"
        >
          Enviar Formulario
        </button>
      </div>
    );
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado con éxito!');
    console.log('Valores del formulario:', formValues);
  };

  return (
    <div className="w-full h-full bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Vista Previa</h2>
      
      {/* Contenedor del dispositivo móvil */}
      <div className="mobile-device">
        {/* Barra de estado del dispositivo */}
        <div className="status-bar">
          <div>9:41 AM</div>
          <div className="flex space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-.17a3 3 0 01.83-2.07l3.58-3.58a1 1 0 00.29-.71V6a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v2.17a3 3 0 01-.83 2.07l-3.58 3.58a1 1 0 01-.7.29H7a3 3 0 00-3 3v2a1 1 0 001 1h11a1 1 0 001-1v-2a3 3 0 00-3-3h-.17a1 1 0 01-.7-.29l-.83-.83A1 1 0 0112 12h1a1 1 0 001-1V8a1 1 0 00-1-1h-1z" />
            </svg>
          </div>
        </div>
        
        {/* Contenido del formulario */}
        <div className="form-content">
          <form onSubmit={handleSubmit} className="p-4">
            {/* Header del formulario */}
            <div className="form-header">
              <h1 className="text-xl font-bold">Formulario</h1>
            </div>
            
            {/* Campos del formulario */}
            {Array.isArray(fields) && fields.map((field: any) => (
              <React.Fragment key={field.id}>
                {renderField(field)}
              </React.Fragment>
            ))}
            
            {/* Botón de envío */}
            {renderSubmitButton()}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPreview;
