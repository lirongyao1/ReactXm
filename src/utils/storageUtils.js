import store from 'store'
const USER_KEY='user'
export const  setItem =(value)=>{
    if (value && typeof value !=="function"){
        store.set(USER_KEY,value)
    }else {
        console.log('保存失败');
    }
}
export const getItem=()=>{
    const value= store.get(USER_KEY)
    return value||''
}
export const removeItem=()=>{
    store.remove(USER_KEY)
}