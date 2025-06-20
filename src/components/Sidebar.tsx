// src/components/Sidebar.tsx
import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { FieldType } from '../types/fields';

interface PaletteItemProps {
  type: FieldType;
  label: string;
  icon: string;
  premium?: boolean;
}

const PaletteItem: React.FC<PaletteItemProps> = ({ type, label, icon, premium }) => {
  // Usamos el tipo directamente como parte del ID para simplificar
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `palette-${type}`,
  });

  // Aplicar transformación para drag-and-drop
  const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`palette-item ${premium ? 'palette-item-premium' : ''}`}
      aria-label={label}
    >
      <span className="palette-item-icon">{icon}</span>
      <span className="palette-item-label">{label}</span>
    </div>
  );
};

// Definición de los campos básicos con sus iconos
const basicFields: PaletteItemProps[] = [
  { type: 'pagina', label: 'Página', icon: '📄' },
  { type: 'seccion', label: 'Sección', icon: '📑' },
  { type: 'mensaje', label: 'Mensaje', icon: '💬' },
  { type: 'numerico', label: 'Numérico', icon: '🔢' },
  { type: 'fecha_hora', label: 'Fecha/Hora', icon: '📅' },
  { type: 'opciones', label: 'Opciones', icon: '📋' },
  { type: 'ubicacion', label: 'Ubicación', icon: '📍' },
  { type: 'imagen', label: 'Imagen', icon: '🖼️' },
  { type: 'firma', label: 'Firma', icon: '✍️' },
];

// Definición de los campos avanzados con sus iconos
const advancedFields: PaletteItemProps[] = [
  { type: 'num_auto', label: 'Num. Auto', icon: '🔄' },
  { type: 'codigo', label: 'Código', icon: '📊' },
  { type: 'ocr', label: 'OCR', icon: '📝', premium: true },
  { type: 'qr', label: 'QR', icon: '📱', premium: true },
  { type: 'bosquejo', label: 'Bosquejo', icon: '✏️' },
  { type: 'oculto', label: 'Oculto', icon: '👁️' },
  { type: 'accion', label: 'Acción', icon: '▶️' },
  { type: 'tabla', label: 'Tabla', icon: '🗃️' },
  { type: 'galeria', label: 'Galería', icon: '🖼️', premium: true },
  { type: 'adjuntar', label: 'Adjuntar', icon: '📎' },
  { type: 'datos', label: 'Datos', icon: '💾' },
  { type: 'proceso', label: 'Proceso', icon: '⚙️', premium: true },
  { type: 'rest', label: 'REST', icon: '🌐', premium: true },
  { type: 'nfc', label: 'NFC', icon: '📲', premium: true },
];

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-content">
      <div className="sidebar-section">
        <h2 className="sidebar-title">Campos Básicos</h2>
        <div className="field-palette">
          {basicFields.map((field) => (
            <PaletteItem key={field.type} {...field} />
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <h2 className="sidebar-title">Campos Avanzados</h2>
        <div className="field-palette">
          {advancedFields.map((field) => (
            <PaletteItem key={field.type} {...field} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;