import React from 'react'
import PropTypes from 'prop-types'

const Task = ({ is_complete, description, onClick }) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: is_complete ? 'line-through' : 'none'
        }}
    >
        {description}
    </li>
)

Task.propTypes = {
    is_complete: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Task