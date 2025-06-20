// ✅ Tipos de campos identificados (9 básicos + 12 avanzados)
export type FieldType =
  | 'pagina'
  | 'seccion'
  | 'mensaje'
  | 'numerico'
  | 'fecha_hora'
  | 'opciones'
  | 'ubicacion'
  | 'imagen'
  | 'firma'
  | 'num_auto'
  | 'codigo'
  | 'ocr'
  | 'qr'
  | 'bosquejo'
  | 'oculto'
  | 'accion'
  | 'tabla'
  | 'galeria'
  | 'adjuntar'
  | 'datos'
  | 'proceso'
  | 'rest'
  | 'nfc'

// ✅ Propiedades básicas del campo
export interface BasicProps {
  dataName: string
  titleText: string
  suggestionText?: string
  screenType: 'text' | 'dropdown' | 'number' | 'date' | 'signature' | 'location' | string
}

// ✅ Diseño visual y layout
export interface DesignProps {
  layout: 'vertical' | 'horizontal'
  backgroundColor?: string
  transparent?: boolean
  disableTableView?: boolean
  contractOnSelect?: boolean
  autoCompleteThreshold?: number
}

// ✅ Validación y comportamiento dinámico
export interface ValidationProps {
  required: boolean
  visibility: 'always' | 'conditional'
  dynamicValue?: string // fórmula o referencia
  readOnly?: boolean
  customValidation?: string // JS script
  barcodeSearch?: boolean
}

// ✅ Opciones avanzadas del campo
export interface AdvancedProps {
  defaultValue?: string
  linkToGlobalValue?: string
  excludeFromExport?: boolean
  personalData?: boolean
  showDefaultOption?: boolean
}

// ✅ Estructura central de un campo
export interface Field {
  id: string
  type: FieldType
  order: number
  properties: {
    basic: BasicProps
    design: DesignProps
    validation: ValidationProps
    advanced: AdvancedProps
  }
}

// ✅ Estructura para DnD Kit
export interface DraggableField extends Field {
  parentId?: string // para soportar secciones anidadas
}

export interface FieldGroup {
  id: string
  title: string
  fields: DraggableField[]
}

// ✅ Estado global del editor (Zustand)
// ✅ EditorState COMPLETO con todas las funciones
export interface EditorState {
  // Estados
  fields: DraggableField[]
  selectedFieldId: string | null
  activeSection: 'basic' | 'design' | 'validation' | 'advanced'
  mode: 'edit' | 'preview'
  
  // Funciones síncronas
  setFields: (fields: DraggableField[]) => void
  addField: (field: DraggableField) => void
  updateField: (id: string, updated: Partial<DraggableField>) => void
  removeField: (id: string) => void
  selectField: (id: string | null) => void
  setActiveSection: (section: EditorState['activeSection']) => void
  setMode: (mode: EditorState['mode']) => void
  reset: () => void
  
  // ✅ AGREGADO: Funciones asíncronas que YA EXISTEN en tu store
  saveFormToSupabase: (name: string) => Promise<void>
  loadFormFromSupabase: (formId: string) => Promise<void>
}
