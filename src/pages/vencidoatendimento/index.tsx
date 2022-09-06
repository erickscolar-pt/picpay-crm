import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";

type ItemProps = {
    idmtv_mtv: number,
    nome_mtv: string,
    origem_mtv: number
}

interface ListaMotivo{
    listamotivo: ItemProps[]
}

export default function VencidoAtendimento({ listamotivo }: ListaMotivo){

    //console.log(listamotivo)

    //localStorage.setItem('listamotivo', JSON.parse(listamotivo))
    const router = useRouter()
    const param = router.asPath

    const [listMotivo, setListMotivo] = useState(listamotivo || [])
    const [motivoSelect, setMotivoSelect] = useState(0)

    var btnactive:boolean = false

    if(param == '/vencidonegociacao'){
        btnactive = true;
    }

    function selectMotivo(event){

        //console.log("posição", event.target.value)
        //console.log("selecionado", listMotivo[event.target.value])

        setMotivoSelect(event.target.value)

    }

    return(
        <>
        <Head>
            <title>PicPay - Vencido Atendimento</title>
        </Head>
        <div className={styles.bg}>

            <Header/>
            
            <div className={styles.btnspaginator}>
                <Link
                href={"/vencidonegociacao"}
                >
                    <button className={btnactive ? styles.bgactive : styles.bginative}>Negociação</button>
                </Link>

                <Link
                href={"/vencidoatendimento"}
                >
                    <button className={!btnactive ? styles.bgactive : styles.bginative}>Atendimento</button>
                </Link>
            </div>

            <form className={styles.form}>
                <h1>Vencido</h1>

                <input className={styles.inputname} type="text" name="nome" id="" placeholder="Nome"/>
                <input type="text" name="cpf" id="" placeholder="CPF"/>
                <input type="text" name="telefone" id="" placeholder="Telefone"/>

                {/* criar inputs e uma lista de ocorrencia */}
                <div className={styles.tab}>
                    <h1>Tabulação</h1>
                    <select name="tabulacao" value={motivoSelect} onChange={selectMotivo}>
                        <option value="">Selecione uma Tabulação</option>
                        {listamotivo.map((motivos, index)=>{
                            return(
                                <option value={index} key={motivos.idmtv_mtv}>{motivos.nome_mtv}</option>
                            )
                        })}

                    </select>

                    <textarea name="tabulacao" placeholder="Descreva o motivo ..." minLength={20}  maxLength={255}>

                    </textarea>
                </div>

                <button type="submit">Confirmar</button>
            </form>

            <Footer/>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{

        console.log(ctx)
        const apiClient = setupAPIClient(ctx)
    
        const response = await apiClient.get('/motivo')
    

        //console.log(response.data)
    
        return{
            props:{
                listamotivo: response.data
            }
        }
    

})