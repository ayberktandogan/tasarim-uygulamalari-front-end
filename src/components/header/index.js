import { useContext, useState } from 'react'
import { AppBar, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core'

import { MdAccountCircle, MdBrightness2, MdWbSunny, MdMenu, MdHome, MdArrowBack } from "react-icons/md";
import { GiBookshelf } from "react-icons/gi"
import { BiBuilding } from "react-icons/bi"
import { SiGoogleclassroom } from "react-icons/si"
import { FaSchool } from "react-icons/fa"
import { HeaderLogoDark, HeaderLogoLight } from '../../config/images';
import { Link } from 'react-router-dom'
import useStyles from "./styles"
import UserContext from '../../contexts/user.context';
import SettingsContext from '../../contexts/settings.context';

function HeaderLink(props) {
    const classes = useStyles()
    return (
        <Link to={props.to}>
            <Typography variant="h6" className={classes.HeaderButtonItem}>
                {props.icon} {props.title}
            </Typography>
        </Link>
    )
}

function MobileHeaderLink(props) {
    const { title, to, onClick, setSwipeableMenu, icon } = props
    return (
        <>
            {to ?
                <Link to={to} onClick={() => setSwipeableMenu(state => !state)}>
                    <ListItem button key={title + "mobile"}>
                        {icon ? <ListItemIcon>{icon}</ListItemIcon> : ""}
                        <ListItemText primary={title} />
                    </ListItem>
                </Link>
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
            to: "/",
            title: "Ana sayfa",
            icon: <MdHome size={20} />
        },
        {
            to: "/okullar",
            title: "Okullar",
            icon: <FaSchool size={20} />
        },
        {
            to: "/bolumler",
            title: "Bölümler",
            icon: <BiBuilding size={20} />
        },
        {
            to: "/dersler",
            title: "Dersler",
            icon: <SiGoogleclassroom size={20} />
        },
        {
            to: "/notlar",
            title: "Notlar",
            icon: <GiBookshelf size={20} />
        }
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
                            <MdAccountCircle />
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
                                <MenuItem>Çıkış yap</MenuItem>
                                :
                                <>
                                    <MenuItem>Giriş yap</MenuItem>
                                    <MenuItem>Kayıt ol</MenuItem>
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