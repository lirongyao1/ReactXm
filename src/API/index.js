import ajax from './ajax'
import jsonp from 'jsonp'
export function reqLogin(username,password) {
    console.log(username, password);
  return  ajax('/login',{username,password},'POST')
}
export function reqAddUser(use) {
    ajax('http://localhost:5000',use,'POST')
}
export  const reqWeather=ctiy=>{
    return new Promise((resolve,reject)=>{
        jsonp(
            'http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',
            {},
            (err,data)=>{
                if(!err){
                    console.log(data);
                    resolve(data.results[0].weather_data[0])
                }else {
                    console.log('天气请求失败：', err);
                    reject('天气请求失败~');
                }
            }
        )

    })
}