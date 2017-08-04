import React from 'react'
import PropTypes from 'prop-types'
import {VISIBILITY} from "../common"

const Button = ({ text, onClick }) => {
    return (
        <form>
            <input type="button" value={text} onClick={e => {
                e.preventDefault()
                let taskVisibility = (text === "HIDE COMPLETED TASKS") ? VISIBILITY.HIDE_COMPLETED : VISIBILITY.SHOW_COMPLETED
                onClick(taskVisibility)
            }}
            />
        </form>
    )
}

// TODO: fix proptypes
// Button.propTypes = {
//     text: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired
// }

export default Button