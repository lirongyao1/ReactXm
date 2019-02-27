import axios from 'axios'
import {message} from 'antd'
export default function (url,data,method='GET') {
    let promise=null
    if(method==='GET'){
        promise=   axios.get(url,{params:data})
    }else if(method==='POST'){
        console.log(data);
     promise=   axios.post(url,data)
    }
 return promise
     .then((res)=>{
         console.log(res);
         return res
     })
     .catch((erro)=>{
        console.log('失败')
         message.error('请求失败')
     })
}
