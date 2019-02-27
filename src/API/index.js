import ajax from './ajax'
export function reqLogin(username,password) {
    console.log(username, password);
  return  ajax('/login',{username,password},'POST')
}
export function reqAddUser(use) {
    ajax('http://localhost:5000',use,'POST')
}