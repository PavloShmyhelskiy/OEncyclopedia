import httpClient from "@api/httpClient";
import type { Login } from "@uikit/organisms/modals/LoginModal";


export interface userData { 
  email: string; 
  password: string 
}

export class NetworkError extends Error { }

export const getUserData = async (data : userData) => {
  try { 
    const { data: userData } = await httpClient.post< Login >("http://localhost:8800/api/auth/login", 
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


// export const getUserDataQuery = async (data : Object) => {
//   console.log("sad", data)
  
//   try {
//     const userData = queryClient.fetchQuery("ds", getUserData, {
//       staleTime: Number.POSITIVE_INFINITY,
//     })
//     console.log("getUserDataQuery:", userData)

//   } catch (e) { 
//     console.log(e)
//   }
// }


    // useQuery<Login, AxiosError>([ data ], async () => {
    //   const { data } = await httpClient.get< Login >("/api/auth/login");
    //   return data;
    // }, 
    // {
    //   staleTime: Number.POSITIVE_INFINITY,
    // });