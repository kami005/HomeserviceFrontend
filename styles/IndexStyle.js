import styled from '@emotion/styled'
import { Paper, Card, Box, CardContent, IconButton, ListSubheader, ListItem, ListItemText, Typography, Button, DialogActions, DialogTitle, Rating } from "@mui/material"
import { alpha } from "@mui/system"
import { DataGrid } from '@mui/x-data-grid'
import { themeVar } from '../src/DataSource/themeVar'



export const BodyPaperStyle = styled(Paper)(props=>({
  width:'100%',
 // overflow:'auto',
  backgroundColor:alpha(props.theme.shadowText,1),
  display:'flex',
  flexDirection:'column',
  justifyContent:'space-between'
}))  

export const ListSubHeaderStyle = styled(ListSubheader)(props=>({
  backgroundColor:alpha(props.theme.tabBackground,0.7),
  color:props.theme.text,
  display:'flex',
  height:'2.5rem',
  justifyContent:"space-between",
  alignItems:'center',
  textTransform:'uppercase',
  width:'100%'
}))

export const ListSubFooterStyle = styled(ListSubheader)(props=>({
  backgroundColor:alpha(props.theme.tabBackground,0.7),
  color: props.theme.text,
  display:'flex',
  height:'2.5rem',
  alignItems:'center',
  textTransform:'uppercase',
  margin:'0',
  [themeVar.breakpoints.down('tablet')]:{
      justifyContent:"flex-end",
  }
}))

export const ListItemHeadStyle = styled(ListItem)(props=>({
  padding:'0 0 0 0.1rem',
  margin:'0.1rem 0',
  backgroundColor:alpha(props.theme.tabBackground, 0.9),
  '& svg':{
      width:'20px'
  },
}))
export const ListItemStyle = styled(ListItem)(props=>({
  padding:'0 0 0 1rem',
  margin:0,
  backgroundColor:alpha(props.theme.tabBackground, 0.4),
  '& svg':{
      width:'20px'
  }
}))

export const ListTextStyle = styled(ListItemText)(props=>({
  color:props.theme.text,
  '& span':{
      fontSize:'0.9rem',
      fontWeight:600,
  },
}))

export const TypographyStyle = styled(Typography)(props=>({
  fontSize:'1rem',
  fontWeight:600,
  letterSpacing:'0.1em',
})  )

export const BtnStyle = styled(Button)(props=>({
  borderRadius:'1rem',
  height:'2rem',
  width:'6rem !important',
  fontWeight:700,
}))
export const StyledBoxMain = styled(Box)(
    {
      display:'flex',
      flexDirection:'column',
      padding:'0 0.2rem',
  } )

  export const PaperStyled = styled(Paper)(props=>({
    backgroundColor:props.theme.tabBackground,
  }))

  export const CardGraphStyle =styled(Card)(props=>(
    {
      backgroundColor:props.theme.tabBackground,
      margin:'0.5rem 0',
      '& span':{
        fontWeight:700,
        fontSize:'1.5rem',
        letterSpacing:'0.1em',
        color:props.theme.text,
        [themeVar.breakpoints.down('mobile')]:{
          fontSize:'1.3rem',
        }
      },
      
    }
  ))

  export const IconBtnStyle = styled(IconButton)(props=>({
    
    '& svg':{
      color:props.theme.text,
      width:'25px',
      height:'25px',
      filter:`drop-shadow(0 0 5px ${props.theme.shadowText}) drop-shadow(1.5px 1.5px ${props.theme.shadowText}) drop-shadow(0 0 20px ${props.theme.shadowText})`,
    }
  }))

    export const RatingStyle = styled(Rating)(props=>({
    
    '& svg':{
      color:props.theme.text,
      width:'25px',
      height:'25px',
      filter:`drop-shadow(0 0 5px ${props.theme.shadowText}) drop-shadow(1.5px 1.5px ${props.theme.shadowText}) drop-shadow(0 0 20px ${props.theme.shadowText})`,
    }
  }))
  export const CardContentStyle = styled(CardContent)(props=>({
    display:'flex',
    flexDirection:'column',
    margin:'0',
    '& h6':{
      fontWeight:700,
      fontSize:'1.5rem',
      letterSpacing:'0.1em',
      color:props.theme.text,
      [themeVar.breakpoints.down('mobile')]:{
        fontSize:'1.2rem',
      } 
    },
  
  }))

  export const DialogActionStyle = styled(DialogActions)({
    backgroundColor:alpha('#355C7D', 0.4),
})

export const DialogTitleStyle = styled(DialogTitle)({
    backgroundColor:alpha('#355C7D', 0.4),
})

  export const DataGridStyle = styled(DataGrid)(props=>({
    borderRadius:'0.5rem',
    border: 0,
    '& svg, p, input':{
      color:props.theme.text
    },
    '& .super-app-theme--header':{
            backgroundColor: alpha('#152D32', 0.8),
            color:'azure',
            fontSize:'1rem'
    },

  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: alpha('#152D32', 0.8),
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: `1px solid #303030`
  },

  '& .MuiDataGrid-cell': {
    color: 'rgba(255,255,255,0.9)'
  },
  '& .super-app-theme--UNPAID':{
    border: `1px solid black`,
    backgroundColor: alpha(themeVar.palette.error.dark, 0.7),

'&:hover':{
    backgroundColor: alpha(themeVar.palette.error.dark, 1),

},      
},
'& .super-app-theme--PARTIALPAID, .super-app-theme--PURCHASE':{
    backgroundColor: alpha(themeVar.palette.warning.dark, 0.7),

'&:hover':{
    backgroundColor: alpha(themeVar.palette.warning.dark, 1),
},      
},
'& .super-app-theme--RETURN, .super-app-theme--SALERETURN':{
  backgroundColor: alpha(themeVar.palette.info.dark, 0.7),

'&:hover':{
  backgroundColor: alpha(themeVar.palette.info.dark, 1),
},      
},
'& .super-app-theme--PAID, .super-app-theme--SALE':{
    backgroundColor: alpha(themeVar.palette.success.dark, 0.7),

'&:hover':{
    backgroundColor: alpha(themeVar.palette.success.dark, 1),
},      
}
}))