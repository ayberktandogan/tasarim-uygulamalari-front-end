import React from 'react'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import PropTypes from 'prop-types'


export default function Loading(props) {
    const { disableShrink, size } = props

    return (
        <Box style={{ width: "100%" }} display="flex" justifyContent="center">
            <CircularProgress disableShrink={disableShrink ? true : false} />
        </Box>
    )
}

Loading.propTypes = {
    disableShrink: PropTypes.bool,
    size: PropTypes.number
}