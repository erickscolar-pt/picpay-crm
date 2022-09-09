import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify';

type AuthContextData = {
    usuario: UsuarioProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UsuarioProps ={
    idusu_usu: number;
    username?: string;
    nivel_usu?: number;
    token?: string;
}

type SignInProps = {
    username: string;
    password: string;
}

type SignUpProps = {
    username: string;
    password: string;
    nivel: number;
}

type AuthProviderProps ={
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('nivel')
        Router.push('/')
    }catch{
        //console.log('erro ao deslogar')
    }
}


export function AuthProvider({ children }: AuthProviderProps){

    const [usuario, setUsuario] = useState<UsuarioProps>()

    const isAuthenticated = !!usuario;

    useEffect(() => {

        // tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();

        ////console.log(token)
    
/*         if(token){
          api.put('/auth/refreshtoken').then(response => {
            const { idusu_usu, nivel_usu, token } = response.data;
    
            ////console.log('**************** dados: ' + idusu_usu)
            setUsuario({
                idusu_usu,
                nivel_usu,
                token
            })
    
          })
          .catch(() => {
            //Se deu erro deslogamos o user.
            signOut();
          })
        } */
    
    
      }, [])

    async function signIn({ username, password }: SignInProps){

        ////console.log('login => ' + username)
        ////console.log('senha => ' + password)

        try{
            const response =  await api.post('/auth/signin',{
                username,
                password
            })

            ////console.log(response.data);

            const {idusu_usu,nivel_usu, token} = response.data[0];

            ////console.log(token)
            ////console.log(nivel_usu)


                if (window) { 
                  // set props data to session storage or local storage 
                  sessionStorage.setItem('id',idusu_usu)
                  sessionStorage.setItem('nivel',nivel_usu) 
                }



            setCookie(undefined,'@nextauth.token', token,{
                maxAge: 60 * 60 * 24 * 30,
                path: "/" // Quais caminhos terao acesso ao cookie
            })

            setUsuario({
                idusu_usu,
                username,
                nivel_usu
            })

            // Passar para as proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Bem vindo!")

            //Redirecionar para pagina atendimento
            Router.push('/inicial')


        }catch(err){
            toast.error("Erro ao acessar.")
            //console.log('Erro ao acessar => ' + err)
        }
    }

    async function signUp({ username, password, nivel }: SignUpProps) {
                ////console.log('login => ' + username)
        ////console.log('senha => ' + password)

        try{
            const response =  await api.post('/signup',{
                username,
                password,
                nivel
            })

            toast.success("Conta criada com sucesso.")

            Router.push('/')


        }catch(err){
            toast.error("Erro ao cadastrar usuario.")
            //console.log('Erro ao cadastrar => ' + err)
        }
    }


    return(
        <AuthContext.Provider value={{ usuario, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}