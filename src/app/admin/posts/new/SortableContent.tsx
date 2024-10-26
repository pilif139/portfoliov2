"use client"

import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export function SortableContent({id,children} : {id: number, children: React.ReactNode}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    backgroundColor: isDragging ? "#2e3440" : "#3b4252",
    boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
    cursor: isDragging ? 'grabbing' : 'grab',
  };
  
  return (
    <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners} 
        className="rounded-lg p-2">
      {children}
    </div>
  );
}