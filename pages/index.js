
import React, {useEffect, useReducer, useContext, useState} from 'react'
import {BodyPaperStyle, BtnStyle, CardContentStyle, CardGraphStyle, DialogActionStyle, DialogTitleStyle, IconBtnStyle, ListItemHeadStyle, ListItemStyle, ListSubFooterStyle, ListSubHeaderStyle, ListTextStyle, RatingStyle, StyledBoxMain, TypographyStyle} from '../styles/IndexStyle'
import Header from '../src/Components/HeaderText'
import { alertReducer, dashboardReducer, dialogReducer, useToggle } from '../src/CustomHooks/RandHooks'
import {SessionContext} from '../src/Context/SessionContext'
import { useRouter } from 'next/router'
 import { homeKey } from '../src/DataSource/RandData'
import { Alert, Box, Button, CardHeader, CircularProgress, Collapse, Dialog, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, MenuItem, Rating, Snackbar, TextField, Typography } from '@mui/material'
import { AddQoute, DeleteMyQoute, GetMyQoutes, JobComplete } from '../src/BackendConnect/QouteStorage'
import { CancelOutlined, CheckCircleRounded, Close, ClosedCaption, Delete, Done, DownloadDoneOutlined, Edit, Message } from '@mui/icons-material'
import { FindUserRating, SetUserRating } from '../src/BackendConnect/AuthenticateUser'

const Index = () => {

  const router = useRouter()
  const [homeData, dispatchHomeData] = useReducer(dashboardReducer, [])
  const [alertSnack, dispatchSnack] = useReducer(alertReducer, {message:'SAVED Successfuly', isOpen:false, msgColor:'success'})
  const [openDialog, dispatchDialog] = useReducer(dialogReducer, {message:'Confirm to Update', isOpen:false, msgColor:'warning', status:'update'})
  const context = useContext(SessionContext)
  const [searchBy, setSearchBy] = useState('Pending')
  const {session, theme} = context
  const [loadingQoutes, toggleLoading] = useToggle(false)
  const [curData, setCurData]= useState({})
  const handlesearchByChange=(e)=>{
    setSearchBy(e.target.value)
  }

  const FindQoutes = async()=>{
  try{
    if(!loadingQoutes)
    toggleLoading()
    const resp = await GetMyQoutes({username:session[0].username, status:searchBy })
    dispatchHomeData({type:'ADDDATA', payload:resp.data})
    toggleLoading(false)
  }catch(err)
  {
    toggleLoading(false)
  }
   
  }
  

  const AcceptOffer =async(qoute, data)=>{
    toggleLoading()
   const newData = {...data, completedBy:{...qoute}, status:'Accepted'}
  const resp = await AddQoute(newData)
  FindQoutes()
  }

  const DeleteQuery =async(_id)=>{
    toggleLoading()
      const resp = await DeleteMyQoute(_id)
      FindQoutes()
      dispatchDialog({type:'CLOSEMSG'})
      toggleLoading(false)
      dispatchSnack({type:'OTHER', message:'Deleted Succesfully', msgColor:'warning'})
  }

  const GoToMessages =(id)=>{
    router.push({
      pathname: '/chatroom',
      query: { id: id }
  })
  }

  const DialogOpen =(status, data)=>{
    setCurData(data)
    dispatchDialog({type:status})
  }

  const CompleteJob =async()=>{
      toggleLoading()
    if(!curData.rating)
    {
      dispatchSnack({type:'OTHER', message:'Add Rating for this Job please.', msgColor:'warning'})
    }else
    {
      console.log(curData)
      const resp = await JobComplete(curData)
      let userData = {...curData.completedBy, rating:curData.rating}
       const userRatingRsp = await SetUserRating(userData)
      dispatchSnack({type:'OTHER', message:'Completed Successfully.', msgColor:'primary'})
    }
    toggleLoading(false)
    dispatchDialog({type:'CLOSEMSG'})
  }


  return (
    <StyledBoxMain flex={10}>
    <Header name='HOME'/>
    <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', margin:'0.5rem'}}>
    <Typography variant='h4'>My Problems</Typography>
      <div style={{display:'flex', width:'80%', gap:5}}>
     
    <TextField select sx={{width:'80%'}}
     label='Search By'
                name='searchBy' size='small'
                value={searchBy}
                onChange={handlesearchByChange}
>
<MenuItem value='Pending'>Pending</MenuItem>
  <MenuItem value='Accepted'>Accepted</MenuItem>
  <MenuItem value='Complete'>Complete</MenuItem>
    </TextField>
   
    <Button  sx={{height:'2.5rem'}} variant='contained' onClick={()=>FindQoutes()}> Find</Button>
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
      </CardContentStyle>

      <BodyPaperStyle  theme={theme.themes[theme.active]}>
      <List sx={{padding:0}}>
      <ListItemStyle  theme={theme.themes[theme.active]} >
      <ListTextStyle  theme={theme.themes[theme.active]} sx={{width:'20%'}}> Qoute By  </ListTextStyle>
      <ListTextStyle  theme={theme.themes[theme.active]} sx={{width:'30%'}}> Rating </ListTextStyle>
      <ListTextStyle theme={theme.themes[theme.active]} sx={{width:'20%'}}> Qoute Rate </ListTextStyle>
      <ListTextStyle theme={theme.themes[theme.active]} sx={{width:'30%'}}> Starting Time </ListTextStyle>
      </ListItemStyle>
      </List>
 
 <Divider/>
      {data.qouteBy && data.qouteBy.length && data.qouteBy.map(qoute=>
               <React.Fragment key={qoute.id}>
               <List sx={{padding:0, display:(data.status!=='Pending' && data.completedBy.userName!==qoute.userName) &&'none'}} >
                   <ListItemStyle theme={theme.themes[theme.active]} >
                       <ListTextStyle theme={theme.themes[theme.active]} sx={{width:'20%'}}>{qoute.userName}  </ListTextStyle>
                       <RatingStyle readOnly sx={{width:'30%'}}  
                        name="simple-controlled"
                        value={qoute.rating ? qoute.rating:1} />
                       <ListTextStyle theme={theme.themes[theme.active]} sx={{width:'20%'}}>    {qoute.qouteAmount} £</ListTextStyle>
                       <ListTextStyle theme={theme.themes[theme.active]} sx={{width:'30%', overflow:'hidden'}}>{qoute.startingDate}  </ListTextStyle>
           <IconBtnStyle disabled={!data.qouteBy.length} sx={{padding:0, display:data.status!=='Pending' &&'none'}}
              onClick={()=>AcceptOffer(qoute, data)}> <TypographyStyle 
              sx={{color:theme.themes[theme.active].icon}}>Accept</TypographyStyle> <DownloadDoneOutlined
              sx={{color:theme.themes[theme.active].icon}}/> </IconBtnStyle>

                   </ListItemStyle>
               
               </List>
               
               <Divider/>
               </React.Fragment>
           )}

   <ListSubFooterStyle theme={theme.themes[theme.active]} component="div" id="nested-list-subheader" >
   <TypographyStyle  theme={theme.themes[theme.active]}  variant ='body1'>Total: {data.qouteBy.length} Qoutes Received</TypographyStyle>
   </ListSubFooterStyle>
</BodyPaperStyle>

      <ListItemIcon sx={{display:'flex', gap:2}}  >

      <IconBtnStyle disabled={data.status==='Complete'}  sx={{color:theme.themes[theme.active].icon}} onClick={()=>DialogOpen('DELETE', data)}>
          <Delete />
      </IconBtnStyle>

              <Divider sx={{borderColor:theme.themes[theme.active].icon}} orientation="vertical" variant="middle" flexItem />
            <IconBtnStyle  sx={{padding:0, display:data.status==='Pending' &&'none'}}  
              onClick={()=>GoToMessages(data.completedBy.id)}> <Message  
              sx={{color:theme.themes[theme.active].icon}}/> </IconBtnStyle>
              <Divider sx={{borderColor:theme.themes[theme.active].icon}} orientation="vertical" variant="middle" flexItem />

      <RatingStyle disabled={data.status==='Complete'} sx={{padding:0, display:data.status==='Pending' &&'none' }}  
        name="simple-controlled"
        value={data.rating}
        onChange={(event, newValue) => {
         dispatchHomeData({type:'RATING', index:i, rating:newValue})
        }}
      />
            <IconBtnStyle disabled={data.status==='Complete'}  sx={{padding:0, display:data.status==='Pending' &&'none', color:theme.themes[theme.active].icon}}  
              onClick={()=>DialogOpen('COMPLETE', data)}> <TypographyStyle  sx={{color:theme.themes[theme.active].icon}} theme={theme.themes[theme.active]}  variant ='body1'>Complete</TypographyStyle> <Done  
              sx={{color:theme.themes[theme.active].icon}}/>  </IconBtnStyle>


              </ListItemIcon>
      </CardGraphStyle>
      </Grid>
    ))
    }
  </Box>

    {loadingQoutes &&  <div style={{display: 'flex', justifyContent: 'center' , width:'100%', alignItems:'center',height:'100%'}}>
   <CircularProgress />
  </div> }

 

       {/* Dialog Box is here */}
       <Dialog open={openDialog.isOpen} 
        onClose={()=>dispatchDialog({type:'CLOSEMSG'})}
        aria-labelledby="dialoge-title">
        <DialogTitleStyle id='dialoge-title' >{openDialog.message}</DialogTitleStyle>
        <DialogActionStyle > 
        <IconButton onClick={()=>openDialog.status==='DELETE'? DeleteQuery(curData):CompleteJob(curData) }>
          {loadingQoutes ? <CircularProgress /> :  <CheckCircleRounded style={{color:'green', fontSize:'2rem'}} />}
        </IconButton>
        <IconButton onClick={()=>dispatchDialog({type:'CLOSEMSG'})}>
            <CancelOutlined style={{color:'red', fontSize:'2rem'}} />
        </IconButton>
        </DialogActionStyle>
        </Dialog>

        {/* Snackbar Alert are here */}
        <Snackbar open={alertSnack.isOpen} autoHideDuration={2000}
         onClose={()=>dispatchSnack({type:'CLOSEMSG'})}
         anchorOrigin={{ vertical:'top',horizontal:'center' }}
         >
        <Alert  severity={alertSnack.msgColor}  elevation={6} variant="filled">
         {alertSnack.message}
        </Alert>
        </Snackbar>
    </StyledBoxMain>
  )
}


export default Index