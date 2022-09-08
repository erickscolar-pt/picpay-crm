import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { setupAPIClient } from "../../services/api";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type ItemProps = {
    idmtv_mtv: number,
    nome_mtv: string,
    origem_mtv: number
}

interface ListaMotivo{
    listamotivo: ItemProps[]
}
export default function AVencerNegociacao({ listamotivo }: ListaMotivo){
    const [idUser, setIdUser] = useState(0)  
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [plano, setPlano] = useState(0);
    const [dataVencimento, setDataVencimento] = useState('');
    const [valorEntrada, setValorEntrada] = useState('');
    const [valorDemais, setValorDemais] = useState('');
    const [tabulacao, setTabulacao] = useState('');
    const [origemAtendimento, setOrigemAtendimento] = useState('');
    const [idMotivo, setIdMotivo] = useState('');
    const [idUsuario, setIdUsuario] = useState('');

    const router = useRouter()
    const param = router.asPath

    const [listMotivo, setListMotivo] = useState(listamotivo || [])
    const [motivoSelect, setMotivoSelect] = useState(0)

    useEffect(() => {
        if (window) { 
          // set props data to session storage or local storage  
          setIdUser(parseInt(sessionStorage.getItem('id')))
        }
    }, []);
    const id = idUser
    
    function selectMotivo(event){

        //console.log("posição", event.target.value)
        //console.log("selecionado", listMotivo[event.target.value])

        setMotivoSelect(event.target.value)

    }
    
    async function handleRegistroVencidoNegociacao(event:FormEvent) {
        event.preventDefault();

        if(
            nome === '' ||
            cpf === '' ||
            telefone === '' ||
            tabulacao === '' || 
            listamotivo[motivoSelect].idmtv_mtv === null
        ){
            toast.warning("Insira todos os campos para prosseguir")
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/atendimento',{
            nome_atnd:nome,
            doc_atnd:cpf,
            tel_atnd:telefone,
            plano_atnd: 0,
            dtvcn_atnd: null,
            vlent_atnd: null,
            vldem_atnd: null,
            tabul_atnd: tabulacao,
            origem_atend:3,
            idmtv_atnd: listamotivo[motivoSelect].idmtv_mtv,
            idusu_atnd: id
        }).catch((err)=>{
            //console.log(err)
            toast.error("Erro ao enviar formulario.")
        })

        toast.success("Formulario enviado com sucesso!")

        setNome('')
        setCpf('')
        setTelefone('')
        setPlano(0)
        setDataVencimento('')
        setValorEntrada('')
        setValorDemais('')
    }


    return(
        <>
        <Head>
            <title>PicPay - A vencer Negociação</title>
        </Head>
        <div className={styles.bg}>

            <Header/>
            

            <form className={styles.form} onSubmit={handleRegistroVencidoNegociacao}>
                <h1>A vencer</h1>

                <input className={styles.inputname} type="text" name="nome" id="" placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
                <input type="text" name="cpf" id="" placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                />
                <input type="text" name="telefone" id="" placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                />

                {/* criar inputs e uma lista de ocorrencia */}
                <div className={styles.tab}>
                    <h1>Tabulação</h1>
                    <select name="tabulacao" value={motivoSelect} onChange={selectMotivo}>
                        <option value="">Selecione uma Tabulação</option>
                        {listamotivo.map((motivos, index)=>{
                            return(
                                motivos.idmtv_mtv === 8 ? <></> :
                                <option value={index} key={motivos.idmtv_mtv}>{motivos.nome_mtv}</option>
                                                            )
                        })}

                    </select>

                    <textarea 
                    className={styles.textarea} 
                    name="tabulacao" 
                    placeholder="Descreva o motivo ..." 
                    minLength={20}  
                    maxLength={255}
                    value={tabulacao}
                    onChange={(e)=> setTabulacao(e.target.value)}
                    >

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

    //console.log(ctx)
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/motivo')


    //console.log(response.data)

    return{
        props:{
            listamotivo: response.data
        }
    }


})