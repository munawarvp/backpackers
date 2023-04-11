import { BASE_URL } from "../utils/config";
export default async function login(e){
    let response = await fetch(`${BASE_URL}/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({'email': e.target.username.value, 'password': e.target.password.value})
            })

            
            let data = await response.json()
            console.log('data',data);
            
            if(response.status === 200){
                localStorage.setItem('authToken', JSON.stringify(data))
                // toast.success('Login Success')
                console.log('success');
                return data;
                
            }else{
                // toast.error('Invalid User Credential')
                console.log('invalid use credential');
        }
}

export function getLocal(){
    let response = localStorage.getItem('authToken');
    return response;
}