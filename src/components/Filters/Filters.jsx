import React from 'react'
import styles from './Filters.module.css'

class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleFilters: [
                {
                    key: 'undone',
                    name: 'Only undone',
                    fn: (todo) => !todo.done,
                    isActive: false,
                },
            ],
            multiFilters: [
                {
                    key: 'urgent',
                    name: 'Important',
                    fn: (todo) => todo.urgency === 'urgent',
                    isActive: false,
                },
                {
                    key: 'medium',
                    name: 'Medium',
                    fn: (todo) => todo.urgency === 'medium',
                    isActive: false,
                },
                {
                    key: 'nonUrgent',
                    name: 'Not important',
                    fn: (todo) => todo.urgency === 'nonUrgent',
                    isActive: false,
                },
            ],
            searchQuery: '',
        }
    }

    render() {
        const { onChangeToggleFilters, onChangeMultiFilters } = this.props

        return (
            <div className={styles.filtersWrapper}>
                <div className={styles.filters}>
                    {this.state.toggleFilters
                        .filter((f) => f.key === 'undone')
                        .map((filter) => (
                            <li key={filter.key}>
                                <input
                                    type="checkbox"
                                    value={filter.isActive}
                                    onChange={() =>
                                        this.handleToggleMultiFiltersChange(
                                            filter,
                                            this.state.toggleFilters,
                                            onChangeToggleFilters
                                        )
                                    }
                                />
                                {filter.name}
                            </li>
                        ))}
                </div>
                <ul className={styles.filters}>
                    {this.state.multiFilters.map((filter) => (
                        <li key={filter.key}>
                            <input
                                value={filter.key}
                                name={'urgencyFilters'}
                                type="checkbox"
                                onChange={() =>
                                    this.handleToggleMultiFiltersChange(
                                        filter,
                                        this.state.multiFilters,
                                        onChangeMultiFilters
                                    )
                                }
                            />
                            {filter.name}
                        </li>
                    ))}
                </ul>
                <input
                    className={styles.filters}
                    type="text"
                    placeholder="Search by todos..."
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                />
            </div>
        )
    }

    handleToggleMultiFiltersChange = (filter, filtersObj, callbackFn) => {
        const updatedFilters = filtersObj.map((f) => {
            if (f.key === filter.key) {
                return { ...f, isActive: !f.isActive }
            }
            return f
        })
        this.setState(
            (prevState) => {
                return filtersObj === prevState.toggleFilters
                    ? { toggleFilters: updatedFilters }
                    : { multiFilters: updatedFilters }
            },
            () => {
                callbackFn(updatedFilters.filter((f) => f.isActive))
            }
        )
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value }, () => {
            this.props.onChangeSearch(this.state.searchQuery)
        })
    }
}

export default Filters
