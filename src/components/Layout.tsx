// src/components/Layout.tsx
import React from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Sidebar from './Sidebar';
import { useFormStore } from '../stores/useFormStore';
import FieldItem from './FieldItem';
import FormPreview from './FormPreview';
import PropertiesPanel from './PropertiesPanel';
import './Layout_simplified.css'; // Importamos los estilos simplificados
import logo from '../assets/logo.png'; // Ajusta la ruta según la ubicación real de tu logo

const Layout: React.FC = () => {
  // Acceder al estado del store
  const fields = useFormStore((state) => state.fields) || [];
  const mode = useFormStore((state) => state.mode);
  const setMode = useFormStore((state) => state.setMode);
  const reorderFields = useFormStore((state) => state.reorderFields);
  const addField = useFormStore((state) => state.addField);
  
  console.log('Fields:', fields); // Para depuración
  console.log('Mode:', mode); // Para depuración
  
  // Manejador para cuando termina el arrastre
  const handleDragEnd = (event: DragEndEvent) => {
    console.log('Drag end event:', event);
    const { active, over } = event;
    
    if (!over) return;
    
    // Si es un elemento de la paleta, añadir nuevo campo
    if (active.id.toString().startsWith('palette-')) {
      try {
        // Extraer el tipo de campo del ID de manera segura
        const parts = active.id.toString().split('-');
        if (parts.length > 1) {
          const fieldTypeString = parts[1];
          console.log('Añadiendo campo de tipo:', fieldTypeString);
          addField(fieldTypeString as any);
        } else {
          console.error('Formato de ID inválido:', active.id);
        }
      } catch (error) {
        console.error('Error al procesar el tipo de campo:', error);
      }
      return;
    }
    
    // Si es reordenamiento de campos existentes
    if (active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        console.log(`Reordenando campo de posición ${oldIndex} a ${newIndex}`);
        reorderFields(oldIndex, newIndex);
      }
    }
  };

// Header component moved outside of return
function Header() {
  return (
    <header className="app-header">
      <div className="app-title">
        {/* Reemplazamos el span por una etiqueta img */}
        <img
          src={logo}
          alt="Logo Apptualízate"
          className="app-title-logo"
        />
        <span>APPTUALIZATE - Editor de Formularios</span>
      </div>
    </header>
  );
}

return (
  <DndContext 
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
  >
    <div className="app-container">
      {/* Barra superior */}
      <Header />
      
      {/* Sidebar con paleta de campos */}
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
        
        {/* Área de formulario */}
        <main className="form-area">
          {mode === 'edit' ? (
            <div className="form-container">
              <div className="form-header">
                <h2 className="form-title">Formulario</h2>
                <div className="flex gap-2">
                  <button
                    className={`btn ${mode === 'edit' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setMode('edit')}
                  >
                    Editor
                  </button>
                  <button
                    className={`btn ${(mode as string) === 'preview' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setMode('preview')}
                  >
                    Vista Previa
                  </button>
                </div>
              </div>
              
              <div className="form-content">
                {!Array.isArray(fields) || fields.length === 0 ? (
                  <div className="form-empty">
                    <p>Arrastra campos desde la barra lateral para comenzar</p>
                  </div>
                ) : (
                  <SortableContext 
                    items={fields.map(field => field.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {fields.map((field) => (
                        <div key={field.id} className="form-field">
                          <FieldItem field={field} />
                        </div>
                      ))}
                    </div>
                  </SortableContext>
                )}
              </div>
            </div>
          ) : (
            <FormPreview />
          )}
        </main>
        
        {/* Panel de propiedades */}
        <aside className="properties-panel">
          <div className="properties-header">
            <h3 className="properties-title">Propiedades</h3>
          </div>
          <div className="properties-content">
            <PropertiesPanel />
          </div>
        </aside>
      </div>
    </DndContext>
  );
};

export default Layout;
