import React, { useEffect, useState } from 'react'

import { Button, Typography } from '@material-ui/core'
import useStyles from './styles'
import { FourOhFourGif } from '../../config/images'
import { Link, Redirect } from 'react-router-dom'

export default function NotFoundPage() {
    const classes = useStyles()
    const [countdown, setCountdown] = useState(10)

    useEffect(() => {
        if (!countdown) return;

        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [countdown])

    return (
        <>
            {!countdown ? <Redirect to="/" /> : ""}
            <div className={classes.MainContainer}>
                <div className={classes.AltContainer}>
                    <div>
                        <img src={FourOhFourGif} className={classes.FourOhFourGif} alt="" />
                        <div className={classes.TextContainer}>
                            <Typography variant="h1">404</Typography>
                            <Typography variant="body1">
                                Aradığınız sayfayı bulamadık. <br /> Sizi ana sayfaya yönlendirmek zorundayız...
                        </Typography>
                        </div>
                        <Link to="/">
                            <Button fullWidth>
                                Ana sayfaya dön - {countdown}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}