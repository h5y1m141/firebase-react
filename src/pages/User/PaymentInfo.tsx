import React from 'react'
import dayjs from 'dayjs'
import { Grid, makeStyles, Typography } from '@material-ui/core'
type Payment = {
  title: string
  price: number
  createdAt: any
}
type Props = {
  payment: Payment
}

const useStyles = makeStyles(theme => ({}))

export const PaymentInfo: React.FC<Props> = ({ payment }) => {
  const createdAt = dayjs(payment.createdAt?.toDate()).format(
    'YYYY/MM/DD HH:mm'
  )
  const classes = useStyles({})
  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Typography component={'h3'}>{payment.title}</Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        {payment.price}
      </Grid>
      <Grid item xs={12} md={3}>
        {createdAt}
      </Grid>
    </Grid>
  )
}
