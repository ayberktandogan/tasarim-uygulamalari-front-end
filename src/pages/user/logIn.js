import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Link, Redirect } from 'react-router-dom'
import { INDEX_ROUTE, REGISTER_ROUTE } from '../../config/front-routes'
import postDataToAPI from '../../helpers/postDataToAPI'

import { VscLock } from 'react-icons/vsc'
import { MdArrowBack } from 'react-icons/md'

import useStyles from './logIn.styles'
import { useContext, useState } from 'react'
import { authRoute } from '../../config/api-routes'
import UserContext from '../../contexts/user.context'
import { Typography } from '@material-ui/core'
import Loading from '../../components/loading'

export default function LoginPage() {
    const classes = useStyles();
    const [user, setUser] = useContext(UserContext)

    const [userData, setUserData] = useState({ email: "", password: "" })
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)

    function _handleInputChange(event) {
        setUserData(state => ({ ...state, [event.target.id]: event.target.value }))
    }

    function _handleSubmit(event) {
        event.preventDefault()
        setLoginLoading(true)
        postDataToAPI({ route: authRoute + "/giris-yap", data: userData })
            .then(res => {
                if (res.status === 200) {
                    setUser({ username: res.data.username, token: res.data.token, exp: res.data.exp, admin: res.data.admin })
                    setLoginLoading(false)
                }
            }).catch(err => {
                console.log(err.response)
                setLoginError(err.response.data)
                setLoginLoading(false)
            })
    }

    return (
        <Grid container component="main" className={classes.MainContainer}>
            {user.token ? <Redirect to={INDEX_ROUTE} /> : ""}
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
                        Giriş Yap
                    </Typography>
                    <form className={classes.FormContainer} noValidate onSubmit={_handleSubmit}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.SubmitButton}
                            disabled={loginLoading ? true : undefined}
                        >
                            {loginLoading ? <Loading size={24} /> : "Giriş Yap"}
                        </Button>
                        <Grid container>
                            {/* <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid> */}
                            <Grid item>
                                <Link to={REGISTER_ROUTE} variant="body2">
                                    Hesabınız yok mu? Kayıt olun
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    {loginError && loginError.message ?
                        <div className={classes.ErrorContainer}>
                            <Typography variant="body1">
                                {loginError.message}
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
