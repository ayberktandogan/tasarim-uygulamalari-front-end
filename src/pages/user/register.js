import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import { INDEX_ROUTE, LOGIN_ROUTE } from '../../config/front-routes'
import postDataToAPI from '../../helpers/postDataToAPI'

import { VscLock } from 'react-icons/vsc'
import { MdArrowBack } from 'react-icons/md'

import useStyles from './register.styles'
import { useState } from 'react'
import { authRoute } from '../../config/api-routes'
import { Typography } from '@material-ui/core'
import Loading from '../../components/loading'

export default function LoginPage() {
    const classes = useStyles();

    const [userData, setUserData] = useState({ username: "", email: "", password: "", repeat_password: "" })
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerError, setRegisterError] = useState(null)

    function _handleInputChange(event) {
        setUserData(state => ({ ...state, [event.target.id]: event.target.value }))
    }

    function _handleSubmit(event) {
        event.preventDefault()
        setRegisterLoading(true)
        postDataToAPI({ route: authRoute + "/kayit-ol", data: userData })
            .then(res => {
                if (res.status === 200) {
                    setRegisterLoading(false)
                    setRegisterError(res.data)
                }
            }).catch(err => {
                console.log(err.response)
                setRegisterError(err.response.data)
                setRegisterLoading(false)
            })
    }

    return (
        <Grid container component="main" className={classes.MainContainer}>
            <Grid item xs={false} sm={4} md={7} className={classes.Image} />
            <Grid item xs={12} sm={8} md={5} className={classes.RightContainer}>
                <div className={classes.RightContainerInner}>
                    <div className={classes.BackButtonContainer}>
                        <Link to={INDEX_ROUTE}>
                            <MdArrowBack size={24} />
                        </Link>
                    </div>
                    <Avatar className={classes.Avatar}>
                        <VscLock />
                    </Avatar>
                    <Typography variant="h3" component="h1">
                        Kayıt Ol
                    </Typography>
                    <form className={classes.FormContainer} noValidate onSubmit={_handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Kullanıcı adı"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.username}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Adresi"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={_handleInputChange}
                            value={userData.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Şifre"
                            type="password"
                            id="password"
                            autoComplete="password"
                            onChange={_handleInputChange}
                            value={userData.password}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="repeat_password"
                            label="Şifre tekrar"
                            type="password"
                            id="repeat_password"
                            autoComplete="password"
                            onChange={_handleInputChange}
                            value={userData.repeat_password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.SubmitButton}
                            disabled={registerLoading ? true : undefined}
                        >
                            {registerLoading ? <Loading size={24} /> : "Kayıt ol"}
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link to={LOGIN_ROUTE} variant="body2">
                                    Hesabınız var mı? Giriş yapın
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    {registerError && registerError.message ?
                        <div className={classes.ErrorContainer}>
                            <Typography variant="body1">
                                {registerError.message}
                            </Typography>
                        </div> : ""}
                    <div className={classes.CopyrightContainer}>
                        <Typography variant="body1">
                            Copyright © {process.env.REACT_APP_SITE_NAME}
                        </Typography>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
