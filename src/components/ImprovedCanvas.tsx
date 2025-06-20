// src/components/ImprovedCanvas.tsx
import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useFormStore } from '../stores/useFormStore'
import type { DraggableField } from '../types/fields'
import {
  DocumentIcon,
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
  PencilIcon,
  EyeIcon,
  Bars3Icon,
  TrashIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline'

// (ICON_MAP eliminado porque no se utiliza)

// Componente para renderizar vista previa real de cada tipo de campo
const PreviewField: React.FC<{ 
  field: DraggableField
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void 
}> = ({ field, isSelected, onSelect, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: field.id })
  const style = { transform: CSS.Transform.toString(transform), transition }
  
  const title = field.properties?.basic?.titleText || field.type || 'Campo sin título'
  const dataName = field.properties?.basic?.dataName || 'campo'
  const suggestion = field.properties?.basic?.suggestionText || ''
  const required = field.properties?.validation?.required || false

  const renderFieldPreview = () => {
    switch (field.type) {
      case 'pagina':
        return (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <DocumentIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">{title}</h2>
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Página del formulario</p>
          </div>
        )
      
      case 'seccion':
        return (
          <div className="border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-900/20 pl-4 py-3">
            <div className="flex items-center gap-2">
              <Bars3Icon className="w-5 h-5 text-orange-600" />
              <h3 className="font-medium text-orange-900 dark:text-orange-100">{title}</h3>
            </div>
            {suggestion && (
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">{suggestion}</p>
            )}
          </div>
        )
      
      case 'mensaje':
        return (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900 dark:text-yellow-100">{title}</span>
            </div>
            {suggestion && (
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">{suggestion}</p>
            )}
          </div>
        )
      
      case 'numerico':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="number"
              placeholder={suggestion || "Ingrese un número"}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      case 'fecha_hora':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                disabled
              />
              <CalendarIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      case 'opciones':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled
            >
              <option>{suggestion || "Seleccione una opción"}</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      case 'ubicacion':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder={suggestion || "Seleccionar ubicación"}
                className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                disabled
              />
              <MapPinIcon className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 text-center">
              <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500">Mapa interactivo</p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      case 'imagen':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800">
              <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {suggestion || "Toca para capturar foto"}
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      case 'firma':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center bg-gray-50 dark:bg-gray-800">
              <PencilIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {suggestion || "Toca para firmar"}
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
      
      default:
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {title} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              placeholder={suggestion || `Campo ${field.type}`}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">Campo: {dataName}</p>
          </div>
        )
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={onSelect}
      className={`relative group mb-4 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' 
          : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600'
      }`}
    >
      {/* Vista previa del campo */}
      <div className={`p-4 rounded-lg border ${
        isSelected 
          ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' 
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      }`}>
        {renderFieldPreview()}
      </div>
      
      {/* Controles de edición (aparecen en hover/selección) */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...listeners}
          className="p-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-grab active:cursor-grabbing"
          title="Arrastrar para reordenar"
        >
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete()
          }}
          className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
          title="Eliminar campo"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      
      {/* Indicador de campo seleccionado */}
      {isSelected && (
        <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r"></div>
      )}
    </div>
  )
}

// Componente principal del Canvas mejorado
const ImprovedCanvas: React.FC = () => {
  // ✅ FORMA SEGURA de usar el store
  const fields = useFormStore((state) => state.fields || [])
  const selectedFieldId = useFormStore((state) => state.selectedFieldId)
  const selectField = useFormStore((state) => state.selectField)
  const removeField = useFormStore((state) => state.removeField)
  const mode = useFormStore((state) => state.mode || 'edit')
  
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-zone'
  })

  return (
    <div className="flex-1 flex flex-col">
      {/* Header del Canvas */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Vista Previa del Formulario
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'preview' ? 'Modo vista previa' : 'Modo edición'} • {fields.length} campos
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full">
              {mode === 'preview' ? '👁️ Vista Previa' : '✏️ Editando'}
            </span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          {/* Simulación de teléfono móvil */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header del teléfono */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                </div>
                <div className="text-sm font-medium">APPTUALIZATE</div>
                <div className="text-xs">100%</div>
              </div>
            </div>

            {/* Contenido del formulario */}
            <div 
              ref={setNodeRef}
              className={`min-h-96 p-4 transition-all duration-200 ${
                isOver 
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-400' 
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              {fields.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Formulario vacío
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Arrastra campos del panel izquierdo para comenzar a diseñar tu formulario
                  </p>
                </div>
              ) : (
                <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-4">
                    {fields.map((field) => (
                      <PreviewField
                        key={field.id}
                        field={field}
                        isSelected={selectedFieldId === field.id}
                        onSelect={() => selectField && selectField(field.id)}
                        onDelete={() => removeField && removeField(field.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              )}
            </div>

            {/* Footer del teléfono */}
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-t border-gray-200 dark:border-gray-600">
              <div className="w-8 h-1 bg-gray-400 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImprovedCanvas