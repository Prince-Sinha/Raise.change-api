import { redirect } from "react-router-dom";

export function getTokenDuration(){
    const storedexpiration = localStorage.getItem('expiration');
    const expirationDate = new Date(storedexpiration);
    const now = new Date();
    const duration = expirationDate.getTime()- now.getTime();
    return duration;
}

export function getAuth(){
    const token = localStorage.getItem('token');

    if(!token){
        return null;
    }
    
    const tokenDuration = getTokenDuration();

    if(tokenDuration < 0){
        return 'EXPIRED';
    }

    return token;
}

export function tokenLoader(){
    return getAuth();
}
export function checkAuthLoader() {
    
    const token = getAuthToken();
    
    if (!token) {
      return redirect('/login');
    }
   
    return null;
  }