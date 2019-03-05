import React, { Component } from 'react';
import './App.css';
import Todo from "./components/Todo";
import {addTodo} from "./redux/actions";
import { connect } from "react-redux";
import Model from "./components/Model";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword : "",
            searchCategory : "work",
            modelStatus : "close"
        };
        this.addNew = this.addNew.bind(this);
        this.onClose = this.onClose.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
    }

    addNew() {
        this.setState({
            modelStatus : "show",
            searchKeyword : ""
        });
    }

    onClose() {
        this.setState({
            modelStatus : "closed"
        });
    }

    onSearch(e) {
        this.setState({
            searchKeyword : e.target.value
        })
    }

    changeCategory(c) {
        this.setState({
            searchCategory : c
        });
    }

    render() {
        return (
          <div className="App">
            <div className="header bg-white container-fluid">
                <div className="row">
                    <div className="col-12 pt-2">
                        <h5>TODO</h5>
                    </div>
                </div>
            </div>
            <div className="main-body container pt-3 pb-3">
                <div className="row" id="top-container">
                    <div className="col-12 col-sm-6 col-md-3 position-relative">
                        <input type="text" className="form-control border-50" placeholder="search" onChange={(e) => this.onSearch(e)}/>
                        <span className="fas fa-search position-absolute search-icon">&nbsp;</span>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
                        <span className="fas fa-filter icon pt-2">&nbsp;</span>
                        <ul className="tab-container">
                            <li onClick={() => this.changeCategory("work")} className={this.state.searchCategory === "work" ? "tab-list  active bg-pr" : "tab-list"}>Work</li>
                            <li onClick={() => this.changeCategory("birthdays")} className={this.state.searchCategory === "birthdays" ? "tab-list active bg-pr" : "tab-list"}>Birthday</li>
                            <li onClick={() => this.changeCategory("others")} className={this.state.searchCategory === "others" ? "tab-list active bg-pr" : "tab-list"}>Others</li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-6 col-md-3">
                        <button className="float-right btn btn-todo bg-pr border-50" onClick={this.addNew}>Add New Item</button>
                    </div>
                </div>
                <div className="row mt-3" id="card-container">
                    <div className="col-12">
                        <Todo searchCategory={this.state.searchCategory} search={this.state.searchKeyword}/>
                    </div>
                </div>
            </div>
              <Model onClose={this.onClose} status={this.state.modelStatus}/>
          </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state.todos,
});

const mapDispatchToProps = {
    addTodo
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default AppContainer;
