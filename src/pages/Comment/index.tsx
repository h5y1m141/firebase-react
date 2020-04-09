import React, { useContext } from 'react'
import { StateContext } from '../DashBoard'

const Comment: React.FC = () => {
  const [state, setState] = useContext(StateContext)
  console.log(state.user)
  return (
    <>
      <div>
        Comment
        {state.user.uid}
      </div>
    </>
  )
}

export default Comment
