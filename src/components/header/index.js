import { useContext, useState } from 'react'
import { AppBar, Avatar, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'

import { MdAccountCircle, MdBrightness2, MdWbSunny, MdMenu, MdHome, MdArrowBack } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi"
import { BiBuilding } from "react-icons/bi"
import { SiGoogleclassroom } from "react-icons/si"
import { FaSchool } from "react-icons/fa"
// import { HeaderLogoDark, HeaderLogoLight } from '../../config/images';
import { Link, NavLink } from 'react-router-dom'
import useStyles from "./index.styles"
import UserContext from '../../contexts/user.context';
import SettingsContext from '../../contexts/settings.context';
import { CLASSES_ROUTE, DEPARTMENTS_ROUTE, INDEX_ROUTE, LOGIN_ROUTE, NOTES_ROUTE, SCHOOLS_ROUTE, REGISTER_ROUTE } from '../../config/front-routes';

function HeaderLink(props) {
    const classes = useStyles()
    return (
        <NavLink exact to={props.to}>
            <Typography variant="h6" className={classes.HeaderButtonItem}>
                {props.icon} {props.title}
            </Typography>
        </NavLink>
    )
}

function MobileHeaderLink(props) {
    const { title, to, onClick, setSwipeableMenu, icon } = props
    return (
        <>
            {to ?
                <NavLink exact to={to} onClick={() => setSwipeableMenu(state => !state)}>
                    <ListItem button key={title + "mobile"}>
                        {icon ? <ListItemIcon>{icon}</ListItemIcon> : ""}
                        <ListItemText primary={title} />
                    </ListItem>
                </NavLink>
                :
                <ListItem button key={title + "mobile"} onClick={onClick || undefined}>
                    {icon ? <ListItemIcon>{icon}</ListItemIcon> : ""}
                    <ListItemText primary={title} />
                </ListItem>}
        </>
    )
}

export default function Header() {
    const classes = useStyles()

    const [userAnchorEl, setUserAnchorEl] = useState(null)
    const profileMenu = Boolean(userAnchorEl);
    const [swipeableMenu, setSwipeableMenu] = useState(false)

    const [settings, setSettings] = useContext(SettingsContext)
    const [user, setUser] = useContext(UserContext)

    const HeaderLinkList = [
        {
            to: INDEX_ROUTE,
            title: "Ana sayfa",
            icon: <MdHome size={20} />
        },
        {
            to: SCHOOLS_ROUTE({ school_domain: null }),
            title: "Okullar",
            icon: <FaSchool size={20} />
        },
        // {
        //     to: DEPARTMENTS_ROUTE,
        //     title: "Bölümler",
        //     icon: <BiBuilding size={20} />
        // },
        // {
        //     to: CLASSES_ROUTE,
        //     title: "Dersler",
        //     icon: <SiGoogleclassroom size={20} />
        // },
        // {
        //     to: NOTES_ROUTE,
        //     title: "Notlar",
        //     icon: <GiBookshelf size={20} />
        // }
    ]

    function HandleThemeButtonClick() {
        switch (settings.theme) {
            case "dark": {
                setSettings(state => ({ ...state, theme: "light" }))
                break
            }
            case "light": {
                setSettings(state => ({ ...state, theme: "dark" }))
                break
            }
            default: {
                setSettings(state => ({ ...state, theme: "light" }))
                break
            }
        }
    }

    function HandleUserMenuButtonClick(event) {
        setUserAnchorEl(event.currentTarget);
    }

    function HandleUserMenuCloseEvent() {
        setUserAnchorEl(null);
    }

    return (
        <AppBar className={classes.HeaderContainer} position="static" color="transparent">
            <Toolbar>
                <div className={classes.Logo}>
                    <Link to="/">
                        {/* <img src={settings.theme === "dark" ? HeaderLogoDark : HeaderLogoLight} alt="" /> */}
                        <Typography variant="h3">
                            {process.env.REACT_APP_SITE_NAME}
                        </Typography>
                    </Link>
                </div>
                <div className={classes.DesktopButtons}>
                    <div className={classes.HeaderLinkList}>
                        {HeaderLinkList.map(l => <HeaderLink key={l.title} {...l} />)}
                    </div>
                    <div className={classes.HeaderButtonList}>
                        <IconButton onClick={HandleThemeButtonClick}>
                            {settings.theme === "dark" ?
                                <MdWbSunny />
                                :
                                <MdBrightness2 />}
                        </IconButton>
                        <IconButton onClick={HandleUserMenuButtonClick}>
                            {user.username ? <Avatar className={classes.AvatarSmall}>{user.username[0]}</Avatar> : <MdAccountCircle />}
                        </IconButton>
                    </div>
                    <Menu
                        id="user-menu"
                        anchorEl={userAnchorEl}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        open={profileMenu}
                        onClose={HandleUserMenuCloseEvent}
                    >
                        <div>
                            {user.token
                                ?
                                <div onClick={() => setUser({})}>
                                    <MenuItem>Çıkış yap</MenuItem>
                                </div>
                                :
                                <>
                                    <MenuItem>
                                        <Link to={LOGIN_ROUTE}>
                                            Giriş yap
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={REGISTER_ROUTE}>
                                            Kayıt ol
                                        </Link>
                                    </MenuItem>
                                </>
                            }
                        </div>
                    </Menu>
                </div>
                <div className={classes.MobileButton}>
                    <IconButton onClick={() => setSwipeableMenu(state => !state)}>
                        <MdMenu />
                    </IconButton>
                    <SwipeableDrawer
                        anchor="left"
                        open={swipeableMenu}
                        onClose={() => setSwipeableMenu(false)}
                        onOpen={() => setSwipeableMenu(true)}
                    >
                        <div className={classes.MobileDrawer} role="presentation">
                            <div className={classes.MobileDrawerBackButton}>
                                <IconButton onClick={() => setSwipeableMenu(false)}>
                                    <MdArrowBack />
                                </IconButton>
                            </div>
                            {HeaderLinkList.map(l => <MobileHeaderLink {...l} key={l.title + "mobile"} setSwipeableMenu={setSwipeableMenu} />)}
                            <Divider />
                            <MobileHeaderLink
                                onClick={HandleThemeButtonClick}
                                icon={settings.theme === "dark" ? <MdWbSunny /> : <MdBrightness2 />}
                                title="Temayı değiştir" />
                        </div>
                    </SwipeableDrawer>
                </div>
            </Toolbar>
        </AppBar>
    )
}