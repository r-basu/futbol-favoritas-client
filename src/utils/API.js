//local
const URL_PREFIX = "http://localhost:3000"
//deployment
// const URL_PREFIX = "http://localhost:3000"

const API = {
    login:userObj=>{
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                return res.json()
            } else {
                throw new Error("network request failed")
            }
        })
    },
    signup:userObj=>{
        return fetch(`${URL_PREFIX}/api/users`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>{
            if(res.ok){
                return res.json()
            } else {
                throw new Error("network request failed")
            }
        })
    },
    getAllTanks:()=>{
        return fetch(`${URL_PREFIX}/api/tanks`).then(res=>{
            if(res.ok){
                return res.json()
            } else {
                throw new Error("network request failed")
            }
        })
    },
}

export default API