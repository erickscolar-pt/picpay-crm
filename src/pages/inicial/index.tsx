import { canSSRAuth } from "../../utils/canSSRAuth"


export default function Inicial(){
    return(
        <>
        <h1>Hello</h1>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{

    return{
        props:{}
    }
})