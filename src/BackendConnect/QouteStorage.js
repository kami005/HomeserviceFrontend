import axios from "axios"
import { ServerIP } from "../DataSource/BackendIP";


export const SendQuery= async(query)=>{
    const resp= await axios.post(`${ServerIP}/qoute/add`, query)
    return resp

}


export const GetMyQoutes = async(query)=>{
    const resp = await axios.get(`${ServerIP}/qoute/find/?`, {params:{...query}})
    console.log(resp)
    return resp
}

export const DeleteMyQoute = async(_id)=>{
    try{

        const res =  await axios.delete(`${ServerIP}/qoute/delete/?`, {params:{_id}})
            if(res.data)
                return res
            else
                return null
    }catch (err)
    {
        console.log(err)
        return null
    }
}

export const AddQoute = async(data)=>{
    try
    {
        const res =await axios.put(`${ServerIP}/qoute/addqoute/`, data)

            return res
    }catch(err)
    {
        console.log(err)
        return null
    }
}

export const JobComplete = async(data)=>{
    try
    {
        const res =await axios.put(`${ServerIP}/qoute/completejob`, data)

            return res
    }catch(err)
    {
        console.log(err)
        return null
    }
}