import React, { Component } from 'react';

import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/itemTypes'

const noteSource = {
	beginDrag(props){
		return {
			id: props.id
		}
	}
}

const noteTarget ={
	hover(targetProps, monitor) {
		const targetId = targetProps.id
		const sourceProps = monitor.getItem()
		const sourceId = sourceProps.id

		if(sourceId !== targetId){
			targetProps.onMove({sourceId, targetId})
		}
	}
}

@DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) =>({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging() //maps isDragging state to isDragging prop
}))

@DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Note extends Component {
	render() {
		const {connectDragSource, connectDropTarget, isDragging, editing, id, onMove, ...props} = this.props
		//pass through it we are editing
		const dragSource = editing ? a => a : connectDragSource

		return dragSource( connectDropTarget(
			<li style={{opacity: isDragging ? 0 : 1}}{...props}>{props.children}</li>
		))
	}
}
