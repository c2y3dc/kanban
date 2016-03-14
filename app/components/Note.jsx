import React from 'react';

export default class Note extends React.Component {
    constructor(props){
        super(props);

        //Track 'editing' state.
        this.state = {
            editing: false
        };
    }
    render(){
        //Render the component differently based on state.
        if(this.state.editing){
            return this.renderEdit();
        }

        return this.renderNote();
    }
    renderEdit = () => {
        //Deal with blur and input handers. These map to DOM events.
        return <input type="text"
            ref={(e) => e ? e.selectionStart = this.props.task.length : null}
            autoFocus={true}
            placeholder={this.props.task}
            onBlur={this.finishEdit}
            onKeyPress={this.checkEnter} />;
    };
    renderNote = () => {
        //If the user clicks a normal note, trigger editing logic.
        // return <div onClick={this.edit}>{this.props.task}</div>;
        const onDelete = this.props.onDelete;

        return (
            <div onClick={this.edit}>
                <span>{this.props.task}</span>
                {onDelete ? this.renderDelete() : null }
            </div>
        )
    };

    renderDelete = () => {
        return <button onClick={this.props.onDelete}>x</button>;
    };

    edit = () => {
        //Enter edit mode.
        this.setState({
            editing: true
        });
    };
    checkEnter = (e) => {
        //The user hit*enter*, let's finish up.
        if(e.key === 'Enter'){
            this.finishEdit(e);
        }
    };
    finishEdit = (e) => {
        //'Note' will trigger an optional 'onEdit' callback once it has a new value. We will use this to communicate the change to 'App'
        //A smater way to deal with the default value would be to set it through 'defaultProps'.
        //See *typing with React* chapter for more information.
        if(this.props.onEdit){
            this.props.onEdit(e.target.value);
        }

        //Exit edit mode.
        this.setState({
            editing: false
        });
    };
}