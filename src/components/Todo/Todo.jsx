import React from 'react'
import trashbinIcon from '../../assets/trashbin.png'
import styles from './Todo.module.css'
import { URGENCIES } from '../InputForm/InputForm'

class Todo extends React.Component {
    render() {
        const { todo, onDelete } = this.props

        return (
            <li className={styles.todo}>
                <div className={styles.taskAndCheck}>
                    <input
                        type="checkbox"
                        onChange={this.handleCheck}
                        checked={todo.done}
                    />
                    <div>
                        <h2>{todo.name}</h2>
                        <span>{todo.description}</span>
                        <div
                            className={styles.urgency}
                            data-urgency={todo.urgency}
                        >
                            {URGENCIES.find((u) => u.name == todo.urgency).text}
                        </div>
                    </div>
                </div>
                <div className={styles.removeArea} onClick={onDelete}>
                    <img className={styles.removeIcon} src={trashbinIcon} />
                </div>

                <span className={styles.date}>{todo.date}</span>
            </li>
        )
    }
    handleCheck = (e) => {
        const done = e.target.checked
        this.props.onDone(done, this.props.todo.id)
    }
}

export default Todo
