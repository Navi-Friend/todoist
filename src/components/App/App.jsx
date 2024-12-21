import React, { Component } from 'react'
import InputForm from '../InputForm/InputForm'
import Todo from '../Todo/Todo'
import { generateRandomString, setId } from '../../utils/idAssigner'
import styles from './App.module.css'
import Filters from '../Filters/Filters'
import { URGENCIES } from '../InputForm/InputForm'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            toggleFilters: [],
            selectiveFilters: [],
            searchQuery: '',
        }
    }

    handleAddTodo = (newTodo, newDescription, newUrgency) => {
        const todo = {
            name: newTodo,
            description: newDescription,
            done: false,
            id: setId(),
            date: new Date().toLocaleString(),
            urgency: newUrgency,
        }
        this.setState({
            todos: [todo].concat(this.state.todos),
        })
    }

    handleDeleteTodo = (id) => {
        this.setState((prevState) => {
            const todos = prevState.todos.filter((todo) => todo.id !== id)
            return { todos }
        })
    }

    handleDoneTodo = (newDone, id) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) =>
                todo.id === id ? { ...todo, done: newDone } : todo
            )
            return { todos: updatedTodos }
        }, this.sortTodos)
    }

    sortTodos = () => {
        const undoneList = this.state.todos.filter((todo) => !todo.done)
        const doneList = this.state.todos.filter((todo) => todo.done)

        this.setState({
            todos: undoneList.concat(doneList),
        })
    }

    handleToggleFilters = (activeFilters) => {
        this.setState({ toggleFilters: activeFilters })
    }

    handleMultifilters = (activeFilters) => {
        this.setState({ selectiveFilters: activeFilters })
    }
    handleSearch = (searchQuery) => {
        this.setState({ searchQuery })
    }

    genereateTodos = async (n = 1000) => {
        for (let index = 0; index < n; index++) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    this.handleAddTodo(
                        generateRandomString(),
                        generateRandomString(),
                        URGENCIES[Math.floor(Math.random() * URGENCIES.length)]
                            .name
                    )
                    resolve()
                }, 1)
            })
        }
    }

    filterTodos = () => {
        let filteredTodos = this.state.todos.filter((todo) => {
            if (
                this.state.toggleFilters.length ||
                this.state.selectiveFilters.length
            ) {
                return (
                    this.state.toggleFilters.every((filter) =>
                        filter.fn(todo)
                    ) &&
                    this.state.selectiveFilters.some((filter) =>
                        filter.fn(todo)
                    )
                )
            }
            return this.state.todos
        })

        filteredTodos = filteredTodos.filter(
            (todo) =>
                todo.name
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase()) ||
                todo.description
                    .toLowerCase()
                    .includes(this.state.searchQuery.toLowerCase())
        )
        return filteredTodos
    }

    render() {
        const { toggleFilters, selectiveFilters, searchQuery } = this.state
        const displayTodos = this.filterTodos()
        return (
            <div className={styles.wrapper}>
                <h1>Todo List</h1>
                <div className={styles.userInteraction}>
                    <Filters
                        onChangeToggleFilters={this.handleToggleFilters}
                        onChangeMultiFilters={this.handleMultifilters}
                        onChangeSearch={this.handleSearch}
                    />
                    <InputForm
                        onSubmit={this.handleAddTodo}
                        onGenerate={this.genereateTodos}
                    />
                </div>
                <ul className={styles.todoList}>
                    {displayTodos.length
                        ? displayTodos.map((todo) => (
                              <Todo
                                  key={todo.id}
                                  todo={todo}
                                  onDelete={() =>
                                      this.handleDeleteTodo(todo.id)
                                  }
                                  onDone={this.handleDoneTodo}
                              />
                          ))
                        : toggleFilters.length ||
                            selectiveFilters.length ||
                            searchQuery.length
                          ? 'Nothing found matching your criteria'
                          : ''}
                </ul>
            </div>
        )
    }
}

export default App
