
import {StyledBoxMain} from '../styles/IndexStyle'
import Header from '../src/Components/HeaderText'
import { ButtonBox, InputBox } from '../styles/SendTicketStyle'
import { Alert, Button, CircularProgress, Snackbar, TextField, Typography } from '@mui/material'
import { useContext, useReducer } from 'react'
import { alertReducer, customerReducer, useToggle } from '../src/CustomHooks/RandHooks'
import {SendQuery} from '../src/BackendConnect/QouteStorage'
import { SessionContext } from '../src/Context/SessionContext'
import { useRouter } from 'next/router'

const Qoute = () => {
  const route= useRouter()
  const context = useContext(SessionContext)
  const {userData, dispatchMessage, session, socket, theme} = context
    const [textState, dispatchTextField] = useReducer(customerReducer, {name:'', email:'', phone:'', problem:'', message:''})
    const [alertSnack, dispatchSnack ] = useReducer(alertReducer, {message:'Signin Cancelled', isOpen:false, msgColor:'error'})
    const [loadingSend, toggleLoadingSend] = useToggle()
    const SubmitForm =async(e)=>{
        if(e)
        e.preventDefault()
        toggleLoadingSend()
        const session2={...session[0], _id:session[0].token}
        const res = await SendQuery({...textState, customerInfo:session2 })
        toggleLoadingSend(false) 
        dispatchSnack({type:'OTHER', message:'Message Sent', msgColor:'info'})
        setTimeout(() => {
          route.push('/')
        }, 1000);  
    }
  return (
    <StyledBoxMain flex={10}>
    <Header name='HOME'/>

    <form onSubmit={e=>SubmitForm(e)}>
        <InputBox>
        <Typography variant='h6'>Tell us your prblem our expert will contact you back </Typography>
        <TextField placeholder='Name' onChange={e=>dispatchTextField({type:'CHANGEVAL', payload:e})} variant='outlined' type='text' name='name' value={textState.name} autoFocus required/>
        <TextField placeholder='Email' type='email' required onChange={e=>dispatchTextField({type:'CHANGEVAL', payload:e})} variant='outlined' name='email' value={textState.email} autoFocus required/>
        <TextField placeholder='Phone No' onChange={e=>dispatchTextField({type:'CHANGEVAL', payload:e})} variant='outlined' type='text' name='phone' value={textState.phone} autoFocus required/>
        <TextField placeholder='Problem' onChange={e=>dispatchTextField({type:'CHANGEVAL', payload:e})} variant='outlined' type='text' name='problem' value={textState.problem} autoFocus required/>
        <TextField placeholder='Detail' onChange={e=>dispatchTextField({type:'CHANGEVAL', payload:e})} multiline rows={4} variant='outlined' type='text' name='message' value={textState.message} autoFocus required/>
        </InputBox>

        <ButtonBox>
        <Button color='success' variant='contained' type='submit'>{loadingSend ? <CircularProgress /> :'SEND'}</Button>
    </ButtonBox>

    </form>


    <Snackbar open={alertSnack.isOpen} autoHideDuration={2000} onClose={e=>dispatchSnack({type:'CLOSEMSG'})} 
    anchorOrigin={{ vertical:'top',horizontal:'center' }}>
   <Alert  severity={alertSnack.msgColor}  elevation={6} variant='standard'>
     {alertSnack.message}
   </Alert>
   </Snackbar>

    </StyledBoxMain>
  )
}


export default Qoute