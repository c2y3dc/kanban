import uuid from 'node-uuid'
import alt from '../libs/alt'
import NoteActions from '../actions/NoteActions'

class NoteStore {
	constructor(){
		this.bindActions(NoteActions)

		this.notes = []
	}

	create(note) {
		const notes = this.notes

		note.id = uuid.v4()

		this.setState({
			notes: notes.concat(note)
		})
	}

	update(note){

	}

	delete(note){

	}	
}

export default alt.createStore(NoteStore, 'NoteStore')