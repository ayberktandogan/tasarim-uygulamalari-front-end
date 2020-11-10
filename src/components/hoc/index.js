import React from 'react'
import Header from '../header'
import useStyles from './styles'

export default function Wrapper(props) {
    const classes = useStyles()

    return (
        <>
            <Header />
            <main className={classes.MainContainer}>
                <div className={classes.AltContainer}>
                    {props.children}
                </div>
            </main>
        </>
    )
}