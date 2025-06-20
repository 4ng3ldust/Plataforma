// src/components/Layout.tsx
import React from 'react'
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { v4 as uuidv4 } from 'uuid'
import { useFormStore } from '../stores/useFormStore'
import type { DraggableField, FieldType } from '../types/fields'
import Sidebar from './Sidebar'
import ImprovedCanvas from './ImprovedCanvas'  // ✅ Nuevo canvas
import PropertiesPanel from './PropertiesPanel'

const Layout: React.FC = () => {
  const { 
    fields, 
    addField, 
    selectField, 
    mode, 
    setMode, 
    reset,
    saveFormToSupabase 
  } = useFormStore()

  // Configurar sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  // Manejar cuando termina el drag & drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    try {
      // ✅ Detectar drag desde sidebar al canvas
      if (
        active.id.toString().startsWith('palette-') && 
        over.id === 'canvas-drop-zone'
      ) {
        const fieldType = active.id.toString().replace('palette-', '') as FieldType
        
        // ✅ Crear nuevo campo con estructura completa
        const newField: DraggableField = {
          id: uuidv4(),
          type: fieldType,
          order: fields.length,
          properties: {
            basic: {
              dataName: `${fieldType}_${Date.now()}`,
              titleText: getTitleForFieldType(fieldType),
              suggestionText: getSuggestionForFieldType(fieldType),
              screenType: getScreenTypeForFieldType(fieldType),
            },
            design: {
              layout: 'vertical',
              backgroundColor: '#ffffff',
              transparent: false,
              disableTableView: false,
              contractOnSelect: false,
              autoCompleteThreshold: 3,
            },
            validation: {
              required: false,
              visibility: 'always',
              readOnly: false,
            },
            advanced: {
              excludeFromExport: false,
              personalData: false,
              showDefaultOption: true,
            },
          },
        }

        console.log('✅ Agregando campo:', newField)
        addField(newField)
      }
    } catch (error) {
      console.error('❌ Error en drag & drop:', error)
    }
  }

  // Funciones helper para crear campos con datos por defecto
  const getTitleForFieldType = (type: FieldType): string => {
    const titles: Record<FieldType, string> = {
      pagina: 'Nueva Página',
      seccion: 'Sección',
      mensaje: 'Mensaje Informativo',
      numerico: 'Campo Numérico',
      fecha_hora: 'Fecha y Hora',
      opciones: 'Seleccionar Opción',
      ubicacion: 'Ubicación',
      imagen: 'Capturar Imagen',
      firma: 'Firma Digital',
      num_auto: 'Número Automático',
      codigo: 'Código',
      ocr: 'Reconocimiento OCR',
      qr: 'Código QR',
      bosquejo: 'Bosquejo',
      oculto: 'Campo Oculto',
      accion: 'Acción',
      tabla: 'Tabla de Datos',
      galeria: 'Galería de Imágenes',
      adjuntar: 'Adjuntar Archivo',
      datos: 'Datos',
      proceso: 'Proceso',
      rest: 'API REST',
      nfc: 'NFC',
    }
    return titles[type] || 'Campo'
  }

  const getSuggestionForFieldType = (type: FieldType): string => {
    const suggestions: Record<FieldType, string> = {
      pagina: 'Descripción de la página',
      seccion: 'Agrupa campos relacionados',
      mensaje: 'Mensaje para el usuario',
      numerico: 'Ingrese un número',
      fecha_hora: 'Seleccione fecha y hora',
      opciones: 'Seleccione una opción',
      ubicacion: 'Seleccionar en el mapa',
      imagen: 'Toque para capturar',
      firma: 'Firme aquí',
      num_auto: 'Se genera automáticamente',
      codigo: 'Ingrese código',
      ocr: 'Reconocimiento de texto',
      qr: 'Escanear código QR',
      bosquejo: 'Dibuje aquí',
      oculto: 'Campo no visible',
      accion: 'Acción a ejecutar',
      tabla: 'Datos tabulares',
      galeria: 'Múltiples imágenes',
      adjuntar: 'Seleccionar archivo',
      datos: 'Datos del sistema',
      proceso: 'Proceso automatizado',
      rest: 'Llamada a API',
      nfc: 'Toque dispositivo NFC',
    }
    return suggestions[type] || 'Campo de entrada'
  }

  const getScreenTypeForFieldType = (type: FieldType): string => {
    const screenTypes: Record<FieldType, string> = {
      pagina: 'text',
      seccion: 'text',
      mensaje: 'text',
      numerico: 'number',
      fecha_hora: 'date',
      opciones: 'dropdown',
      ubicacion: 'location',
      imagen: 'text',
      firma: 'signature',
      num_auto: 'number',
      codigo: 'text',
      ocr: 'text',
      qr: 'text',
      bosquejo: 'text',
      oculto: 'text',
      accion: 'text',
      tabla: 'text',
      galeria: 'text',
      adjuntar: 'text',
      datos: 'text',
      proceso: 'text',
      rest: 'text',
      nfc: 'text',
    }
    return screenTypes[type] || 'text'
  }

  // Handlers para botones
  const handlePreview = () => {
    setMode(mode === 'edit' ? 'preview' : 'edit')
    console.log('Modo cambiado a:', mode === 'edit' ? 'preview' : 'edit')
  }

  const handleSave = async () => {
    if (fields.length === 0) {
      alert('No hay campos para guardar')
      return
    }
    
    const formName = prompt('Nombre del formulario:')
    if (formName) {
      try {
        await saveFormToSupabase(formName)
        alert(`Formulario "${formName}" guardado correctamente`)
      } catch (error) {
        console.error('Error al guardar:', error)
        alert('Error al guardar el formulario')
      }
    }
  }

  const handleClear = () => {
    if (fields.length > 0 && confirm('¿Estás seguro de limpiar todo el formulario?')) {
      reset()
      console.log('Formulario limpiado')
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar izquierdo - Paleta de campos */}
        <Sidebar />

        {/* Canvas central - Vista previa del formulario */}
        <div className="flex-1 flex flex-col">
          {/* Header mejorado */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  APPTUALIZATE - Editor de Formularios
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {fields.length === 0 
                    ? 'Comienza arrastrando campos del panel izquierdo' 
                    : `${fields.length} campo${fields.length !== 1 ? 's' : ''} agregado${fields.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePreview}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    mode === 'preview'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {mode === 'preview' ? '✏️ Editar' : '👁️ Vista Previa'}
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={fields.length === 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  💾 Guardar
                </button>
                
                <button
                  onClick={handleClear}
                  disabled={fields.length === 0}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  🗑️ Limpiar
                </button>
              </div>
            </div>
          </header>

          {/* ✅ NUEVO CANVAS con vista previa real */}
          <ImprovedCanvas />
        </div>

        {/* Panel derecho - Propiedades */}
        <PropertiesPanel />
      </div>
    </DndContext>
  )
}

export default Layout