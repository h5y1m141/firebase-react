import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { firebase } from '../../config/firebase'

type Order = {
  id: string
  price: number
}

type Props = {
  order: any
}

const useStyles = makeStyles(theme => ({}))
const OrderInfo: React.FC<Props> = ({ order }) => {
  const classes = useStyles({})
  const items: any = []
  order.order.get().then((item: any) => {
    console.log(item.data().items)
    items.push(item.data().items)
  })

  // const orderDetail = firebase
  //   .firestore()
  //   .collection('/orders')
  //   .doc(`${order.id}`)
  //   .get()

  // orderDetail.then(item => {
  //   console.log(item)
  // })

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography component={'h3'}>{order.price}</Typography>
        {order.order.get().then((item: any) => {
          return item.data().items[0]
        })}
      </Grid>
    </Grid>
  )
}

export default OrderInfo
