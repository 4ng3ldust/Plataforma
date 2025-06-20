import { create } from 'zustand';
import type { DraggableField, FieldType } from '../types/fields';

// Estado del formulario
interface FormState {
  form: any;
  fields: DraggableField[];
  selectedFieldId: string | null;
  mode: 'edit' | 'preview';
  
  // Acciones principales
  addField: (type: FieldType) => void;
  updateField: (fieldId: string, updates: Partial<DraggableField>) => void;
  removeField: (fieldId: string) => void;
  selectField: (fieldId: string | null) => void;
  reorderFields: (startIndex: number, endIndex: number) => void;
  setMode: (mode: 'edit' | 'preview') => void;
  clearForm: () => void;
}

// Función para crear campo básico
const createField = (type: FieldType): DraggableField => {
  const id = Math.random().toString(36).substr(2, 9);
  
  // Labels por defecto
  const labels: Record<FieldType, string> = {
    pagina: 'Nueva Página',
    seccion: 'Nueva Sección', 
    mensaje: 'Mensaje Informativo',
    numerico: 'Campo Numérico',
    fecha_hora: 'Fecha y Hora',
    opciones: 'Lista de Opciones',
    ubicacion: 'Ubicación GPS',
    imagen: 'Subir Imagen',
    firma: 'Firma Digital',
    num_auto: 'Número Automático',
    codigo: 'Código de Barras',
    ocr: 'Reconocimiento OCR',
    qr: 'Código QR',
    bosquejo: 'Dibujo Libre',
    oculto: 'Campo Oculto',
    accion: 'Botón de Acción',
    tabla: 'Tabla de Datos',
    galeria: 'Galería de Imágenes',
    adjuntar: 'Adjuntar Archivo',
    datos: 'Conexión de Datos',
    proceso: 'Proceso Automatizado',
    rest: 'API REST',
    nfc: 'Comunicación NFC'
  };

  // Crear campo con estructura mínima pero válida
  return {
    id,
    type,
    properties: {
      basic: {
        dataName: `field_${id}`,
        titleText: labels[type],
        suggestionText: `Ingrese ${labels[type].toLowerCase()}`,
        screenType: 'input'
      },
      design: {
        layout: 'vertical',
        backgroundColor: '#FFFFFF',
        transparent: false,
        disableTableView: false
      },
      validation: {
        required: false,
        visibility: 'always',
        readOnly: false
      },
      advanced: {
        defaultValue: '',
        excludeFromExport: false,
        personalData: false
      }
    }
  } as DraggableField;
};

// Store simplificado
export const useFormStore = create<FormState>((set) => ({
  // Estado inicial vacío para evitar errores
  form: {}, // Añadido para cumplir con la interfaz FormState
  fields: [],
  selectedFieldId: null,
  mode: 'edit',

  // Acciones
  addField: (type: FieldType) => set((state) => {
    const newField = createField(type);
    console.log('Campo agregado:', newField);
    return {
      fields: [...state.fields, newField],
      selectedFieldId: newField.id
    };
  }),

  updateField: (fieldId: string, updates: Partial<DraggableField>) => set((state) => ({
    fields: state.fields.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    )
  })),

  removeField: (fieldId: string) => set((state) => {
    console.log('Campo eliminado:', fieldId);
    return {
      fields: state.fields.filter(field => field.id !== fieldId),
      selectedFieldId: state.selectedFieldId === fieldId ? null : state.selectedFieldId
    };
  }),

  selectField: (fieldId: string | null) => set(() => {
    console.log('Campo seleccionado:', fieldId);
    return { selectedFieldId: fieldId };
  }),

  reorderFields: (startIndex: number, endIndex: number) => set((state) => {
    const newFields = [...state.fields];
    const [movedField] = newFields.splice(startIndex, 1);
    newFields.splice(endIndex, 0, movedField);
    console.log('Campos reordenados');
    return { fields: newFields };
  }),

  setMode: (mode: 'edit' | 'preview') => set(() => {
    console.log('Modo cambiado a:', mode);
    return { mode };
  }),

  clearForm: () => set(() => {
    console.log('Formulario limpiado');
    return {
      fields: [],
      selectedFieldId: null
    };
  })
}));