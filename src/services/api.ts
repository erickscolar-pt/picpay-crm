import axios, { AxiosError } from "axios";
import { parseCookies } from "nookies"; 
import { signOut } from "../contexts/AuthContexts";
import { AuthTokenError } from "./errors/AuthTokenError";

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://deadpool.atmatec.com.br:8300',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response.status === 401){
            //console.log(error.response.status)
            // qualquer erro 401 (nao autorizado) deve deslogar usuario
            if(typeof window !== undefined){
                return signOut()
                //chamar a função para deslogar o usuario
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)

    })

    return api;
}