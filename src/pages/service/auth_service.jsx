import jwt_decode from "jwt-decode";

export default function checkExpireToken(token){
    try {
        const { exp } = jwt_decode(token)
        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.setItem('accessToken', null);
            window.location.replace('/human_management')
        }else if(token === null){
            window.location.replace('/human_management')
        }
    }catch(error){
        console.log(error) 
        window.location.replace('/human_management')
    }

}

