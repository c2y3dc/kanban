import React, { Component } from 'react';

import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes'

const noteSource = {
	beginDrag(props){
		console.log("begin dragging note", props)
		return {}
	}
}

const noteTarget ={
	hover(targetProps, monitor) {
		const sourceProps = monitor.getItem()

		console.log("dragging note", sourceProps, targetProps)
	}
}

@DragSource(ItemTypes.NOTE, noteSource, (connect) =>({
	connectDragSource: connect.dragSource()
}))

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Note extends Component {
	render() {
		const {connectDragSource, connectDropTarget, id, onMove, ...props} = this.props
		return connectDragSource( connectDropTarget(
			<li {...props}>{props.children}</li>
		))
	}
}
