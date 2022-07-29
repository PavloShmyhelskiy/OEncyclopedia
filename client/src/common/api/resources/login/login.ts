import httpClient from "@api/httpClient";
import type { FullUserData } from "@uikit/organisms/modals/LoginModal";


export interface userData { 
  email: string; 
  password: string;
  username?: string;
}

export class NetworkError extends Error { }

export const getUserData = async (data : userData) => {
  try { 
    const { data: userData } = await httpClient.post< FullUserData >("http://localhost:8800/api/auth/login", 
                  { 
                    email: data.email, 
                    password: data.password 
                  });
    return userData;
    
  } catch (e : any) {
    console.log("e", e)
    if (e.response.status === 401) throw e;
    if (e.message === "Network Error") throw new NetworkError("Network Error");
  }
}

export const registerUser = async (data : userData) => {
  try { 
    const { data: userData } = await httpClient.post< FullUserData >("http://localhost:8800/api/auth/register", 
                  { 
                    email: data.email, 
                    password: data.password,
                    username: data.username,
                  });
    return userData;
    
  } catch (e : any) {
    console.log("reg error", e)
    if (e.response.status === 500) throw e;
    if (e.message === "Network Error") throw new NetworkError("Network Error");
  }
}