import React, { Component } from 'react';
import {connect} from "react-redux";
import {addTodo} from "../redux/actions";

class Model extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status : this.props.status || "closed",
            todo : {
                title: "",
                category : "work",
                details : ""
            }
        };

        this.close = this.close.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.addNewTodo = this.addNewTodo.bind(this);
    }

    close() {
        this.setState({
            status : "closed"
        },() => this.props.onClose())
    }

    componentWillReceiveProps(props) {

        console.log("close");
        this.setState({
            status : props.status
        });
    }

    onChangeHandler(e,name) {
        const state = {...this.state};
        state.todo[name ] = e.target.value;
        this.setState(state)
    }

    addNewTodo() {
        const todo = {
            title : this.state.todo.title,
            details : this.state.todo.details,
            category: this.state.todo.category,
        };
        this.props.addTodo(todo);
        this.close();
        this.setState({
            todo : {
                title: "",
                category : "work",
                details : ""
            }
        })
    }

    render() {
        return (
            <>
            <div className={"modal "+this.state.status} id="myModal" style={{display : this.state.status === "show" ? "block" : "none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Todo Details</h4>
                            <button type="button" className="close" onClick={this.close}>&times;</button>
                        </div>

                        <div className="modal-body">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text"  placeholder="Todo Title" className="form-control" onChange={(e) => this.onChangeHandler(e,"title")} value={this.state.todo.title}/>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" onChange={(e) => this.onChangeHandler(e,"category")} value={this.state.todo.category}>
                                    <option value="work">Work</option>
                                    <option value="birthdays">Birthdays</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea placeholder="details" className="form-control" onChange={(e) => this.onChangeHandler(e,"details")} value={this.state.todo.details}>

                                </textarea>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={this.addNewTodo}>Add</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className={"modal-backdrop "+this.state.status} style={{display : this.state.status === "show" ? "block" : "none"}}> </div>
            </>
        );
    }
}


const mapStateToProps = state => ({
    ...state.todos,
});

const mapDispatchToProps = {
    addTodo
};

const ModelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Model);

export default ModelContainer;
