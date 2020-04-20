import React from 'react'
import { makeStyles } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firebase } from '../../config/firebase'
import OrderInfo from './OrderInfo'

const useStyles = makeStyles(theme => ({
  actions: {
    textAlign: 'right',
    marginBottom: theme.spacing(1),
  },
}))

const OrderList: React.FC = () => {
  const classes = useStyles({})
  const [user, loading, error] = useAuthState(firebase.auth())
  const uid = user ? user.uid : ''
  const userOrders = firebase
    .firestore()
    .collection(`/users/${uid}/orders`)
    .orderBy('createdAt', 'desc')
    .limit(20)
    .get()

  let orderIds: any = []
  userOrders.then(userOrder => {
    userOrder.docs.forEach(d => orderIds.push(d.id))
  })

  const [values, checking, loadError] = useCollectionData(
    firebase
      .firestore()
      .collection(`/users/${uid}/orders`)
      .orderBy('createdAt', 'desc')
      .limit(20)
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

  const orders: any[] = values

  return (
    <>
      <h3>orderlist</h3>
      {orders.map((item, index) => {
        return <OrderInfo key={index} order={item} />
      })}
    </>
  )
}

export default OrderList
