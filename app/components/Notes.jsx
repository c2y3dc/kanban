import React from 'react'
import Editable from './Editable'
import Note from './Note'

export default ({notes, onValueClick, onEdit, onDelete}) => {
  return (
    <ul className='notes'>{notes.map((note) =>
      <Note className='note' 
        key={note.id} 
        id={note.id}
        onMove={({sourceId, targetId}) => console.log(`source: ${sourceId}, target: ${targetId}`)
        }>
        <Editable
          editing ={note.editing}
          value={note.task}
          onValueClick={onValueClick.bind(null, note.id)}
          onEdit={onEdit.bind(null, note.id)}
          onDelete={onDelete.bind(null, note.id)} />
      </Note>
    )}</ul>
  )
}
