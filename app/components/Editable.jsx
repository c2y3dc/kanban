import React, { Component } from 'react'

export default class Editable extends Component {
	render(){
		const {value, onEdit, onValueClick, editing, ...props} = this.props
		return(
			<div {...props}>
				{editing ? this.renderEdit() : this.renderValue()}
			</div>
		)
	}
	renderEdit = () => {
		//Deal with blur and input handers. These map to DOM events.
		return (
			<input type="text"
				ref={(element) => element ?
					element.selectionStart = this.props.value.length :
					 null
				}
				autoFocus={true}
				defaultValue={this.props.value}
				onBlur={this.finishEdit}
				onKeyPress={this.checkEnter} />
		)
	}
	renderValue = () => {
		const onDelete = this.props.onDelete;

		return (
			<div onClick={this.props.onValueClick}>
				<span className="value">{this.props.value}</span>
				{onDelete ? this.renderDelete() : null }
			</div>
		)
	}

	renderDelete = () => {
		return <button className="delete" onClick={this.props.onDelete}>x</button>;
	}

	checkEnter = (e) => {
		//The user hit*enter*, let's finish up.
		if(e.key === 'Enter'){
			this.finishEdit(e);
		}
	}

	finishEdit = (e) => {
		//'Note' will trigger an optional 'onEdit' callback once it has a new value. We will use this to communicate the change to 'App'
		//A smater way to deal with the default value would be to set it through 'defaultProps'.
		//See *typing with React* chapter for more information.
		if(this.props.onEdit){
			this.props.onEdit(e.target.value);
		}
	}
}