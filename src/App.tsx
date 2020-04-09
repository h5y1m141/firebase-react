import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// ページコンポーネント
import DashBoard from './pages/DashBoard'
import User from './pages/User'
import Comment from './pages/Comment'

// アプリケーション全体のレイアウト等の読み込み
import AppLayout from './components/AppLayout'
import { ThemeProvider } from '@material-ui/styles'
import theme from './styles/theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <AppLayout>
            <Route path="/" exact component={DashBoard} />

            <Route path="/users/:id" exact component={User} />
            <Route path="/users/:id/comment" exact component={Comment} />
          </AppLayout>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
