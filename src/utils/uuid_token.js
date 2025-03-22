
import {v4 as uuidv4} from 'uuid'

//生成一个随机字符串，每次执行不能发生变化
export const getUUID = ()=>{
	let id_token = localStorage.getItem('UUID')
	if(!id_token){
		id_token = uuidv4()
		localStorage.setItem('UUID',id_token)
	}
	return id_token
}
