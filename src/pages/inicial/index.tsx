import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

export default function Inicial(){


    



    return(
        <>
        <Head>
            <title>PicPay - Inicial</title>
        </Head>
        <div className={styles.bg}>

            <Header/>
            
            <div className={styles.atendimentos}>
                <form className={styles.search}>
                    <input type="text" placeholder="Insira o CPF para realizar a busca"/>
                    <button type="submit">
                        <FaSearch
                            color="#fff"
                            size={14}
                        />
                    </button>
                </form>

                <div className={styles.btnatendimento}>
                    <Link href="/vencidonegociacao"><button type="button">Atendimento - Vencido</button></Link>
                    <Link href="/avencernegociacao"><button type="button">Atendimento - A Vencer</button></Link>
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