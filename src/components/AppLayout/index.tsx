import React from 'react'
import { makeStyles, AppBar, Toolbar } from '@material-ui/core'

// firebase
import { firebase } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

// ページコンポーネント
import DashBoard from '../../pages/DashBoard'

const usesStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 6, 0, 6),
  },
}))
const AppLayout: React.FC = ({ children }) => {
  const classes = usesStyles()
  const [user, loading, error] = useAuthState(firebase.auth())

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!user) {
    return <DashBoard />
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>ログインユーザー: {user.email}</Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </>
  )
}

export default AppLayout
