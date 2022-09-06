import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { setupAPIClient } from "../../services/api";

export default function VencidoNegociacao(){
/* 
  vldem_atnd: Decimal;
  tabul_atnd: string;
  origem_atend: number;
  idmtv_atnd: number;
  idusu_atnd: number;
*/
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

    async function handleRegistroVencidoNegociacao(event:FormEvent) {
        event.preventDefault();

        if(
            nome === '' ||
            cpf === '' ||
            telefone === '' ||
            plano === 0 ||
            dataVencimento === '' ||
            valorEntrada === '' ||
            valorDemais === ''
        ){
            toast.warning("Insira todos os campos para prosseguir")
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/atendimento',{
            nome_atnd:nome,
            doc_atnd:cpf,
            tel_atnd:telefone,
            plano_atnd: plano,
            dtvcn_atnd: dataVencimento + ":00.000Z",
            vlent_atnd: valorEntrada,
            vldem_atnd: valorDemais,
            tabul_atnd: "",
            origem_atend:1,
            idmtv_atnd:1,
            idusu_atnd:1
        }).catch((err)=>{
            console.log(err)
            toast.error("Erro ao enviar formulario.")
        })

        toast.success("Formulario enviado com sucesso!")
    }

    const router = useRouter()
    const param = router.asPath

    var btnactive:boolean = false

    if(param == '/vencidonegociacao'){
        btnactive = true;
    }

    return(
        <>
        <Head>
            <title>PicPay - Vencido Negociação</title>
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

            <form className={styles.form} onSubmit={handleRegistroVencidoNegociacao}>
                <h1>Vencido</h1>

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

                {/* criar inputs plano venci valor ent e valor de referencia acordo */}
                <div className={styles.inputsacordo}>
                    <h1>Acordo</h1>
                    <input className={styles.radius1} type="number" placeholder="Plano"
                    value={plano}
                    onChange={(e) => setPlano(e.target.valueAsNumber)}
                    />
                    <input type="datetime-local" placeholder="Venci."
                    value={dataVencimento}
                    onChange={(e) => setDataVencimento(e.target.value)}
                    />
                    <input type="number" placeholder="Valor Ent."
                    value={valorEntrada}
                    onChange={(e) => setValorEntrada(e.target.value)}
                    />
                    <input className={styles.radius2} type="number" placeholder="Valor De."
                    value={valorDemais}
                    onChange={(e) => setValorDemais(e.target.value)}
                    />
                </div>

                <button type="submit">Confirmar</button>
            </form>

            <Footer/>
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{

    return{
        props:{}
    }
})