// src/components/FieldItem.tsx
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useFormStore } from '../stores/useFormStore';
import type { DraggableField } from '../types/fields';

interface FieldItemProps {
  field: DraggableField;
}

// Función para obtener el icono según el tipo de campo
const getFieldIcon = (type: string): string => {
  const icons: Record<string, string> = {
    pagina: '📄',
    seccion: '📑',
    mensaje: '💬',
    numerico: '🔢',
    fecha_hora: '📅',
    opciones: '📋',
    ubicacion: '📍',
    imagen: '🖼️',
    firma: '✍️',
    num_auto: '🔄',
    codigo: '📊',
    ocr: '📝',
    qr: '📱',
    bosquejo: '✏️',
    oculto: '👁️',
    accion: '▶️',
    tabla: '🗃️',
    galeria: '🖼️',
    adjuntar: '📎',
    datos: '💾',
    proceso: '⚙️',
    rest: '🌐',
    nfc: '📲',
  };
  
  return icons[type] || '❓';
};

const FieldItem: React.FC<FieldItemProps> = ({ field }) => {
  const selectField = useFormStore((state) => state.selectField);
  const selectedFieldId = useFormStore((state) => state.selectedFieldId);
  
  const isSelected = selectedFieldId === field.id;
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const handleSelect = () => {
    selectField(field.id);
  };
  
  // Obtener el título del campo o usar un valor por defecto
  const fieldTitle = field.properties?.basic?.titleText || 'Campo sin título';
  
  // Obtener el tipo de campo para mostrar el icono correspondiente
  const fieldIcon = getFieldIcon(field.type);
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`form-field ${isSelected ? 'selected' : ''}`}
      onClick={handleSelect}
    >
      <div className="form-field-header">
        <div className="flex items-center gap-2">
          <span className="field-icon">{fieldIcon}</span>
          <span className="form-field-title">{fieldTitle}</span>
        </div>
        <div className="field-actions">
          <button className="field-action-btn" title="Editar">✏️</button>
          <button className="field-action-btn" title="Duplicar">📋</button>
          <button className="field-action-btn" title="Eliminar">🗑️</button>
        </div>
      </div>
      
      <div className="form-field-content">
        {/* Renderizar el contenido según el tipo de campo */}
        {field.type === 'mensaje' && (
          <div className="field-message">
            {field.properties?.basic?.suggestionText || 'Texto del mensaje...'}
          </div>
        )}
        
        {field.type === 'numerico' && (
          <div className="field-numeric">
            <input
              type="number"
              className="field-input"
              placeholder="0"
              disabled
            />
          </div>
        )}
        
        {field.type === 'fecha_hora' && (
          <div className="field-datetime">
            <input
              type="date"
              className="field-input"
              disabled
            />
          </div>
        )}
        
        {field.type === 'opciones' && (
          <div className="field-options">
            <select className="field-select" disabled>
              <option>Seleccione una opción...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
          </div>
        )}
        
        {field.type === 'ubicacion' && (
          <div className="field-location">
            <div className="field-map-placeholder">
              📍 Mapa de ubicación
            </div>
          </div>
        )}
        
        {field.type === 'imagen' && (
          <div className="field-image">
            <div className="field-image-placeholder">
              🖼️ Imagen
            </div>
          </div>
        )}
        
        {field.type === 'firma' && (
          <div className="field-signature">
            <div className="field-signature-placeholder">
              ✍️ Área de firma
            </div>
          </div>
        )}
        
        {/* Campos por defecto para otros tipos */}
        {!['mensaje', 'numerico', 'fecha_hora', 'opciones', 'ubicacion', 'imagen', 'firma'].includes(field.type) && (
          <div className="field-default">
            Campo tipo: {field.type}
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldItem;
