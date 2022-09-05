import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";

export default function Inicial(){
    return(
        <>
        <div className={styles.bg}>
            <Head>
                Inicial
            </Head>

            <Header/>
            
            <div className={styles.atendimentos}>
                <div className={styles.search}>
                    <input type="text" placeholder="Insira o CPF para realizar a busca"/>
                </div>

                <div className={styles.btnatendimento}>
                    <button type="button">Atendimento - Vencido</button>
                    <button type="button">Atendimento - A Vencer</button>
                </div>
            </div>

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