import React from 'react'
import { Grid, makeStyles, Typography, Button } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firebase } from '../../config/firebase'
import { PaymentInfo } from './PaymentInfo'

const useStyles = makeStyles(theme => ({
  actions: {
    textAlign: 'right',
    marginBottom: theme.spacing(1),
  },
}))

const User: React.FC = () => {
  const classes = useStyles({})
  const [user, loading, error] = useAuthState(firebase.auth())
  const uid = user ? user.uid : ''
  const [values, checking, loadError] = useCollectionData(
    firebase
      .firestore()
      .collection(`/users/${uid}/payments`)
      .orderBy('createdAt', 'desc')
      .limit(10)
  )
  //
  if (loading || checking) {
    return <div>Loading...</div>
  }
  if (error || loadError) {
    return <div>Error: {error}</div>
  }
  if (!user) {
    return <div>erro</div>
  }

  if (!values) {
    return <div>empty</div>
  }

  const payments: any[] = values

  const fetchPayment = async () => {
    const docId = 'OCQu1J0gPrjeCRVQSz9U'
    const snapshot = await firebase
      .firestore()
      .collection(`/users/${uid}/payments`)
      .doc(docId)
      .get()
  }
  const createPayment = async () => {
    const payment = {
      title: `Reactのアプリから作成しました。user:${user.email}`,
      price: 2000,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }
    const paymentRef = firebase
      .firestore()
      .collection(`/users/${uid}/payments`)
      .doc()

    try {
      await paymentRef.set(payment)
      // alert('作成しました。')
    } catch (e) {
      console.log(e)
      alert('作成に失敗しました。')
    } finally {
    }
  }

  return (
    <>
      <Grid container justify="flex-end" className={classes.actions}>
        <Grid item xs={12} md={12}>
          <Button variant="contained" color="secondary" onClick={createPayment}>
            支払いを作成
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography component={'h3'}>タイトル</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          金額
        </Grid>
        <Grid item xs={12} md={3}>
          作成日
        </Grid>
      </Grid>
      {payments.map((payment, index) => {
        return <PaymentInfo key={index} payment={payment} />
      })}
    </>
  )
}

export default User
