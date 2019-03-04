import ajax from './ajax'
import jsonp from 'jsonp'
export function reqLogin(username,password) {
  return  ajax('/login',{username,password},'POST')
}
export function reqAddUser(use) {
  return  ajax('/',use,'POST')
}
export  const reqWeather=(city='北京')=> {
    return new Promise((resolve,reject)=>{
        jsonp(
            `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
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
export const reqCategories = parentId => {
   return ajax('/manage/category/list',{parentId})
}
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST')
export const reqUpdateCategoryName = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST');
export const reqProductsList = (pageNum, pageSize) => ajax( '/manage/product/list', {pageNum, pageSize})
export const reqSearchProductsList = ({pageNum, pageSize, searchType, searchName}) => ajax('/manage/product/search', {pageNum, pageSize, [searchType]: searchName})