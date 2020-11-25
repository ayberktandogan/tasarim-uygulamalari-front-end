import { useEffect, useState, StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from './config/theming';

import defaultSettings, { handleStateChange as handleSettingsStateChange } from './config/localStorage/settings'
import defaultUser, { handleStateChange as handleUserStateChange } from './config/localStorage/user'
import SettingsContext from './contexts/settings.context'
import UserContext from './contexts/user.context';

import { Document } from 'react-pdf/dist/esm/entry.webpack';

function Mount() {
  const [settings, setSettings] = useState(defaultSettings)
  const [user, setUser] = useState(defaultUser)

  useEffect(() => {
    handleSettingsStateChange(settings)
  }, [settings])

  useEffect(() => {
    handleUserStateChange(user)
  }, [user])

  return (
    <StrictMode>
      <SettingsContext.Provider value={[settings, setSettings]}>
        <UserContext.Provider value={[user, setUser]}>
          <ThemeProvider theme={getTheme(settings.theme)}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </UserContext.Provider>
      </SettingsContext.Provider>
    </StrictMode>
  )
}

ReactDOM.render(<Mount />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
