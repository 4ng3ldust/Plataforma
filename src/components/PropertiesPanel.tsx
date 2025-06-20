// src/components/PropertiesPanel.tsx

import React from 'react'
import { useFormStore } from '../stores/useFormStore'
import type { DraggableField } from '../types/fields'

const sections = [
  { key: 'basic', label: 'Básicas' },
  { key: 'design', label: 'Diseño' },
  { key: 'validation', label: 'Validación' },
  { key: 'advanced', label: 'Avanzadas' },
] as const

type SectionKey = typeof sections[number]['key']

const PropertiesPanel: React.FC = () => {
  const selectedId = useFormStore((s) => s.selectedFieldId)
  const fields = useFormStore((s) => s.fields)
  const activeSection = useFormStore((s) => s.activeSection)
  const setActiveSection = useFormStore((s) => s.setActiveSection)
  const updateField = useFormStore((s) => s.updateField)

  if (!selectedId) {
    return (
      <aside className="w-80 bg-gray-50 dark:bg-gray-900 p-4">
        <p className="text-gray-500 dark:text-gray-400">Selecciona un campo para editar sus propiedades</p>
      </aside>
    )
  }

  const field = fields.find((f) => f.id === selectedId) as DraggableField

  const handlePropChange = (section: SectionKey, prop: string, value: string | boolean | number) => {
    updateField(field.id, {
      properties: {
        ...field.properties,
        [section]: {
          ...field.properties[section],
          [prop]: value,
        } as any,
      },
    })
  }

  return (
    <aside className="w-80 bg-gray-50 dark:bg-gray-900 p-4 overflow-auto">
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
        Propiedades: {field.properties.basic.titleText}
      </h3>

      <div className="mb-4">
        {sections.map((sec) => (
          <button
            key={sec.key}
            className={`mr-2 px-3 py-1 rounded-full text-sm font-medium transition ${
              activeSection === sec.key
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveSection(sec.key)}
          >
            {sec.label}
          </button>
        ))}
      </div>

      <div>
        {activeSection === 'basic' && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Nombre de dato
            </label>
            <input
              type="text"
              value={field.properties.basic.dataName}
              onChange={(e) => handlePropChange('basic', 'dataName', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />

            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
              Título
            </label>
            <input
              type="text"
              value={field.properties.basic.titleText}
              onChange={(e) => handlePropChange('basic', 'titleText', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />

            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
              Sugerencia
            </label>
            <input
              type="text"
              value={field.properties.basic.suggestionText || ''}
              onChange={(e) => handlePropChange('basic', 'suggestionText', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {activeSection === 'design' && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Layout
            </label>
            <select
              value={field.properties.design.layout}
              onChange={(e) => handlePropChange('design', 'layout', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>

            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
              Color de fondo
            </label>
            <input
              type="color"
              value={field.properties.design.backgroundColor || '#ffffff'}
              onChange={(e) => handlePropChange('design', 'backgroundColor', e.target.value)}
              className="mt-1"
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={field.properties.design.transparent || false}
                onChange={(e) => handlePropChange('design', 'transparent', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Transparente</span>
            </div>
          </div>
        )}

        {activeSection === 'validation' && (
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={field.properties.validation.required}
                onChange={(e) => handlePropChange('validation', 'required', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Obligatorio</span>
            </div>

            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mt-4">
              Visibilidad
            </label>
            <select
              value={field.properties.validation.visibility}
              onChange={(e) => handlePropChange('validation', 'visibility', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="always">Siempre</option>
              <option value="conditional">Condicional</option>
            </select>
          </div>
        )}

        {activeSection === 'advanced' && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Valor por defecto
            </label>
            <input
              type="text"
              value={field.properties.advanced.defaultValue || ''}
              onChange={(e) => handlePropChange('advanced', 'defaultValue', e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={field.properties.advanced.excludeFromExport || false}
                onChange={(e) => handlePropChange('advanced', 'excludeFromExport', e.target.checked)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Excluir de exportación</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default PropertiesPanel