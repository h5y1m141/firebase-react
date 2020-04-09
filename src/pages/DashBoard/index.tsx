import React, { createContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, makeStyles, Button } from '@material-ui/core'
import { Form, Formik, FormikActions } from 'formik'
import FormField from '../../components/FormField'
import { auth } from '../../config/firebase'

type State = {
  user: any
}

const initialState = {
  user: {},
}

export const StateContext = createContext<[State, (state: State) => void]>([
  initialState,
  () => {},
])

const useStyles = makeStyles(theme => ({
  submitBtn: {
    width: '100%',
    backgroundColor: theme.palette.grey[900],
    color: 'white',
    marginBottom: theme.spacing(10),
  },
}))

const DashBoard: React.FC = () => {
  const id = 1
  const classes = useStyles({})
  const [state, setState] = useState<State>(initialState)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const initialValues = {
    email: '',
    password: '',
  }
  if (isLoggedIn) {
    return (
      <>
        <Redirect to={`/users/${id}`} />
      </>
    )
  }
  const validate = () => {}
  const onSubmit = async (
    values: any,
    { setSubmitting }: FormikActions<any>
  ) => {
    const email = values.email
    const password = values.password

    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        setIsLoggedIn(true)
        setState({ user: res.user })
      })
      .catch(error => {
        alert('Emailとパスワードを再度確認してください')
      })
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={onSubmit}
        render={() => {
          return (
            <Grid container>
              <Form>
                <Grid item xs={12}>
                  <FormField.TextField
                    name="email"
                    label="email"
                    placeholder="Firestoreのログイン用のEmail"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField.TextField
                    name="password"
                    label="password"
                    placeholder="Firestoreのログインパスワード"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                    className={classes.submitBtn}
                  >
                    ログイン
                  </Button>
                </Grid>
              </Form>
            </Grid>
          )
        }}
      ></Formik>
    </>
  )
}

export default DashBoard
