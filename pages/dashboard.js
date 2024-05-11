
import { Box, Button, CardHeader, CircularProgress, Divider, Grid, IconButton, MenuItem, TextField, Typography } from '@mui/material'
import Header from '../src/Components/HeaderText'
import { CardContentStyle, CardGraphStyle, IconBtnStyle, RatingStyle, StyledBoxMain } from '../styles/IndexStyle'
import { useContext, useEffect, useReducer, useState } from 'react'
import {  dashboardReducer, useToggle } from '../src/CustomHooks/RandHooks'
import { AddQoute, GetMyQoutes } from '../src/BackendConnect/QouteStorage'
import { SessionContext } from '../src/Context/SessionContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs'
import { Message } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { FindUserRating } from '../src/BackendConnect/AuthenticateUser'
 const Dashboard = () => {
  const router = useRouter()
  const [myRating, setRating] = useState(1)
  const [homeData, dispatchHomeData] = useReducer(dashboardReducer, [])
  const [searchBy, setSearchBy] = useState('Pending')
  const [dataLoad, setData] =useState([])
  const context = useContext(SessionContext)
  const {session, theme} = context
  const [loadingQoutes, toggleLoading] = useToggle(false)
  
  const handlesearchByChange=(e)=>{
    setSearchBy(e.target.value)
  }
  const FindPrevQoute = (index)=>{

  let username = session[0].username
  let qouteBy = dataLoad[index]

  if(qouteBy)
  {
    for(let i=0;i<qouteBy.length;i++)
    {
      if(qouteBy[i].userName===username)
      { 

        
        return {amount:qouteBy[i].qouteAmount, startingDate:qouteBy[i].startingDate, isQouted:true}
      }
}
    return {isQouted:false, amount:0, startingDate:''}
  }
else
   return {isQouted:false, amount:0, startingDate:''}
  }

  const FindQoutes = async(status)=>{
    if(!loadingQoutes)
    toggleLoading()
    const resp = await GetMyQoutes({username: {$ne:session[0].username}, status: status ? status:'Pending'})
    let data = []
    for (let i=0;i<resp.data.length;i++)
    {
      data.push(resp.data[i].qouteBy)
    }
    setData(data)
    dispatchHomeData({type:'ADDDATA', payload:resp.data})
  
    toggleLoading(false)

    FindPrevQoute(resp.data)
  }

  const SetQoute = async(i)=>{
    try
    {
      toggleLoading()
      
      const qoute = await AddQoute(homeData[i])
      FindQoutes()
      toggleLoading(false)
    }catch(err)
    {
      toggleLoading(false)
      console.log(err)
    }
   
  }

  const GoToMessages =(id)=>{
    router.push({
      pathname: '/chatroom',
      query: { id: id }
  })
  }

  const FindMyRating = async()=>{
    const resp = await FindUserRating(session[0].token)
    setRating(resp)

  } 

  useEffect(()=>{
FindMyRating()
  },[])

  return (
   <StyledBoxMain flex={10}>
   <Header name='DASHBOARD' />

   <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', margin:'0.5rem'}}>
    <div style={{display:"flex"}}>
    <Typography component="legend">My Rating</Typography>
   <RatingStyle readOnly sx={{width:'30%'}}  
                        name="simple-controlled"
                        value={myRating} />
    </div>

    <Typography variant='h4'>My Jobs</Typography>
      <div style={{display:'flex', width:'80%', gap:5}}>
      <TextField select sx={{width:'80%'}}
   label='Search By'
              name='searchBy' size='small'
              value={searchBy}
              onChange={handlesearchByChange}
>
<MenuItem value='Pending'>My Pending Offers</MenuItem>
<MenuItem value='Accepted'>My Accepted Qoutes</MenuItem>
<MenuItem value='Complete'>Completed Jobs</MenuItem>
  </TextField>
 
  <Button variant='contained' onClick={()=>FindQoutes(searchBy)}> Find</Button>
      </div>

  </Box>
   <Box>
  {(homeData && homeData.length && !loadingQoutes) && 
    homeData.map((data,i)=>(
      <Grid key={i} item xl={2.95} lg={2.95} md={3.95} sm={5.95} xs={5.95}>
      <CardGraphStyle elevation={10} theme={theme.themes[theme.active]}>
      <CardHeader title={data.problem}/>
      <Divider />
      <CardContentStyle theme={theme.themes[theme.active]} >
       <Typography variant='h6'>Issue Related to: {data.message}</Typography>
       <Typography variant='h6'>Status: {data.status}</Typography>
       <Typography variant='h6' sx={{display:data.status==='Pending' && 'none'}}>Email: {data.customerInfo.email}</Typography>
       <Typography variant='h6' sx={{display:data.status==='Pending' && 'none'}}>Phone No: {data.customerInfo.phone}</Typography>
      </CardContentStyle>
      
      <Box sx={{display:'flex', gap:2}}>
      <TextField disabled={FindPrevQoute(i).isQouted} sx={{display:!FindPrevQoute(i).isQouted ? 'none':''}} value={FindPrevQoute(i).amount}/>

      <TextField disabled={FindPrevQoute(i).isQouted} sx={{display:!FindPrevQoute(i).isQouted ? 'none':''}} value={FindPrevQoute(i).startingDate}/>

      <TextField sx={{display:FindPrevQoute(i).isQouted ? 'none':''}}  placeholder='Qoute' variant='outlined' onChange={(e)=>dispatchHomeData({type:'CHANGEQOUTE', payload:e.target, index:i, username:session[0].username, id:session[0].token, rating:session[0].rating})}
      type='text' name='qouteAmount' id='qouteAmount' autoFocus required/>
    <LocalizationProvider  dateAdapter={AdapterDayjs}>
  
        <DateTimePicker  sx={{display:FindPrevQoute(i).isQouted ? 'none':''}} label="Start Date Time" id='startingDate' name='startingDate' required
       onChange={(e)=>    dispatchHomeData({type:'CHANGEDATE', payload:e, index:i, username:session[0].username, id:session[0].token, rating:session[0].rating})} />
    </LocalizationProvider>
      <Button variant='contained' onClick={()=>SetQoute(i)} disabled={FindPrevQoute(i).isQouted}>{FindPrevQoute(i).isQouted===true ?'Qouted':'Qoute'}</Button>
      <IconButton  sx={{padding:0, display:data.status==='Pending' &&'none'}}  onClick={()=>GoToMessages(data.customerInfo.id)}> <Message  sx={{color:theme.themes[theme.active].icon}}/> </IconButton>
      </Box>
     


      </CardGraphStyle>
      </Grid>
    ))
    }
  </Box> 

  {loadingQoutes &&  <div style={{display: 'flex', justifyContent: 'center' , width:'100%', alignItems:'center',height:'100%'}}>
   <CircularProgress />
  </div> }
   </StyledBoxMain>
  )

}


export default Dashboard