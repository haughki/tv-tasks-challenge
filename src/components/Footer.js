import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VISIBILITY } from '../common'

const Footer = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter={VISIBILITY.SHOW_ALL}>
            All
        </FilterLink>
        {', '}
        <FilterLink filter={VISIBILITY.SHOW_ACTIVE}>
            To do
        </FilterLink>
    </p>
)

export default Footer