import React, { Component } from 'react';
import {connect} from "react-redux";
import {addTodo, deleteTodo} from "../redux/actions";

class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : props.todos || [],
            originalTodos : props.todos || [],
            searchKeyword : "",
            searchCategory : props.searchCategory || "work"
        };
        this.delete = this.delete.bind(this);
        this.search = this.search.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            todos : props.todos || [],
            originalTodos : props.todos || [],
            searchKeyword : props.search,
            searchCategory : props.searchCategory || "work"

        },this.search);
    }

    search() {
        const searchCategory = this.state.searchCategory;
        if(this.state.searchKeyword!=="") {
            const keyword = this.state.searchKeyword;

            const todos = [...this.state.todos].filter((todo) => {
                return todo.title.toLowerCase().includes(keyword.toLowerCase()) && todo.category.toLowerCase() === searchCategory;
            });

            this.setState({
                todos :  todos,
            })

        } else {
            console.log(searchCategory);
            const todos = [...this.state.todos].filter((todo) => {
                return todo.category.toLowerCase().includes(searchCategory.toLowerCase());
            });
            console.log(todos);

            this.setState({
                todos :  todos,
            })
            // this.setState({
            //     todos :  [...this.state.todos],
            // })
        }
    }

    delete(i) {
        console.log(i);
        this.props.deleteTodo(i);
    }

    render() {
        return (
            <div className="todo-container card-columns">
                {this.state.todos.length === 0 ? "No Todos, Please add " : (
                    this.state.todos.map((todo,i) => {
                        return <div key={"todo-"+i} className="card bg-white position-relative">
                            <div className="card-body text-center">
                                <p className="card-title">{todo.title}</p>
                                <p className="card-text m-0">{todo.details}</p>
                                <p className="card-category">Category : {todo.category}</p>
                                <span onClick={(e) => this.delete(i)} className="fas fa-trash trash">&nbsp;</span>
                            </div>
                        </div>
                    })
                    ) }
            </div>
        );
    }
}



const mapStateToProps = state => ({
    todos : state.todos
});

const mapDispatchToProps = {
    addTodo,
    deleteTodo
};

const TodoContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todo);

export default TodoContainer;
