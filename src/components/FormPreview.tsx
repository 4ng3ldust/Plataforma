// src/components/FormPreview.tsx
import React from 'react'
import { useFormStore } from '../stores/useFormStore'
import type { DraggableField, FieldType } from '../types/fields'
import {
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
  PencilIcon,
  NumberedListIcon,
  ListBulletIcon,
  EyeIcon,
  DocumentIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline'

interface FormFieldProps {
  field: DraggableField
  isSelected: boolean
  onSelect: () => void
}

const FormField: React.FC<FormFieldProps> = ({ field, isSelected, onSelect }) => {
  const { basic, validation } = field.properties
  const title = basic.titleText || field.type
  const placeholder = basic.suggestionText || ''
  const required = validation.required

  const baseClasses = `
    relative mb-4 p-3 rounded-lg border transition-all duration-200 cursor-pointer
    ${isSelected 
      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md' 
      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
    }
    bg-white dark:bg-gray-800
  `

  const renderFieldByType = () => {
    switch (field.type) {
      case 'pagina':
        return (
          <div className="text-center py-6">
            <DocumentIcon className="w-12 h-12 mx-auto text-blue-500 mb-2" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Página del formulario</p>
          </div>
        )

      case 'seccion':
        return (
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500">Sección del formulario</p>
          </div>
        )

      case 'mensaje':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <EyeIcon className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-900 dark:text-white">{title}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {placeholder || 'Mensaje informativo para el usuario'}
            </p>
          </div>
        )

      case 'numerico':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <NumberedListIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                placeholder={placeholder || 'Ingresa un número'}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled
              />
            </div>
          </div>
        )

      case 'fecha_hora':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled
              />
            </div>
          </div>
        )

      case 'opciones':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="radio" className="w-4 h-4 text-blue-600" disabled />
                <span className="text-gray-700 dark:text-gray-300">Opción 1</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" className="w-4 h-4 text-blue-600" disabled />
                <span className="text-gray-700 dark:text-gray-300">Opción 2</span>
              </div>
              <div className="flex items-center gap-2">
                <input type="radio" className="w-4 h-4 text-blue-600" disabled />
                <span className="text-gray-700 dark:text-gray-300">Opción 3</span>
              </div>
            </div>
          </div>
        )

      case 'ubicacion':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={placeholder || 'Seleccionar ubicación'}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                disabled
              />
            </div>
            <div className="mt-2 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-8 h-8 text-gray-400" />
              <span className="ml-2 text-gray-500">Vista del mapa</span>
            </div>
          </div>
        )

      case 'imagen':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <PhotoIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-500">Toca para tomar foto o seleccionar imagen</p>
            </div>
          </div>
        )

      case 'firma':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 h-32 bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
              <PencilIcon className="w-8 h-8 text-gray-400 mr-2" />
              <span className="text-gray-500">Área de firma</span>
            </div>
          </div>
        )

      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={placeholder || `Campo ${field.type}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled
            />
          </div>
        )
    }
  }

  return (
    <div className={baseClasses} onClick={onSelect}>
      {renderFieldByType()}
      
      {/* Badge de campo seleccionado */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
          Seleccionado
        </div>
      )}
    </div>
  )
}

const FormPreview: React.FC = () => {
  const { fields, selectedFieldId, selectField, mode } = useFormStore()

  if (fields.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <DocumentIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Formulario vacío
          </h3>
          <p className="text-gray-500 max-w-sm">
            Arrastra campos desde el panel izquierdo para comenzar a diseñar tu formulario
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto">
      {/* Header del formulario */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 mb-6">
        <h1 className="text-xl font-semibold">Vista Previa del Formulario</h1>
        <p className="text-blue-100 text-sm mt-1">
          {fields.length} campo{fields.length !== 1 ? 's' : ''} • Modo {mode === 'edit' ? 'Edición' : 'Vista Previa'}
        </p>
      </div>

      {/* Contenedor tipo móvil */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          {fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              isSelected={selectedFieldId === field.id}
              onSelect={() => selectField(field.id)}
            />
          ))}
          
          {/* Botón de envío simulado */}
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-6">
            Enviar Formulario
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormPreview