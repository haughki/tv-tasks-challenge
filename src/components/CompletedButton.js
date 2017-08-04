import React from 'react'
import PropTypes from 'prop-types'
import {VISIBILITY} from "../common"
import Button from 'react-bootstrap/lib/Button';


const CompletedButton = ({ disableUi, text, onClick }) => {
    return (
        <Button style={{ margin: "20px 0px"}} disabled={disableUi} onClick={e => {
            e.preventDefault()
            let taskVisibility = (text === "HIDE COMPLETED TASKS") ? VISIBILITY.HIDE_COMPLETED : VISIBILITY.SHOW_COMPLETED
            onClick(taskVisibility)
        }}>{text}</Button>
    )
}

// TODO: fix proptypes
// Button.propTypes = {
//     text: PropTypes.string.isRequired,
//     onClick: PropTypes.func.isRequired
// }

export default CompletedButton