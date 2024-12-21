import React from 'react'
import styles from './InputForm.module.css'

export const URGENCIES = [
    { name: 'nonUrgent', text: 'Not important' },
    { name: 'medium', text: 'Medium' },
    { name: 'urgent', text: 'Important' },
]

class InputForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodo: '',
            newDescription: '',
            isValidMainInput: false,
            urgency: URGENCIES[0].name,
        }
    }

    render() {
        const { newTodo, newDescription, isValidMainInput } = this.state
        return (
            <div className={styles.inputAreaWithButton}>
                <div className={styles.inputArea}>
                    <div className={styles.inputsAndImportance}>
                        <input
                            className={styles.mainInput}
                            type="text"
                            placeholder="Add a new todo"
                            value={newTodo}
                            onChange={this.handleMainInputChange}
                            onKeyPress={this.handleKeyPress}
                        />

                        <textarea
                            className={styles.descriptionInput}
                            type="text"
                            placeholder="Todo description (optional)"
                            value={newDescription}
                            onChange={this.handleDescriptionChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <div className={styles.importance}>
                            {URGENCIES.map((u) => (
                                <button
                                    key={u.name}
                                    className={
                                        this.state.urgency == u.name
                                            ? styles.activeImportance
                                            : ''
                                    }
                                    onClick={() =>
                                        this.handleSelectUrgency(u.name)
                                    }
                                >
                                    {u.text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <button
                            className={`${styles.addButton} ${!isValidMainInput ? styles.invalid : ''}`}
                            onClick={this.handleSubmit}
                        >
                            Add
                        </button>
                        <button
                            className={styles.addButton}
                            onClick={() => this.props.onGenerate()}
                        >
                            Add 1000
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    handleMainInputChange = (event) => {
        const value = event.target.value
        this.setState(() => ({
            newTodo: value,
            isValidMainInput: value.trim() != '',
        }))
    }

    handleDescriptionChange = (event) => {
        this.setState({ newDescription: event.target.value })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.props.onSubmit(
                this.state.newTodo,
                this.state.newDescription,
                this.state.urgency
            )
            this.setState({
                newTodo: '',
                newDescription: '',
                isValidMainInput: false,
            })
        }
    }

    handleSubmit = () => {
        if (!this.state.isValidMainInput) {
            return
        }
        this.props.onSubmit(
            this.state.newTodo,
            this.state.newDescription,
            this.state.urgency
        )

        this.setState({
            newTodo: '',
            newDescription: '',
            isValidMainInput: false,
        })
    }

    handleSelectUrgency = (urgencyName) => {
        this.setState({ urgency: urgencyName })
    }
}

export default InputForm
