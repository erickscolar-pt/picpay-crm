import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

export default function AVencerNegociacao(){

    return(
        <>
        <Head>
            <title>PicPay - A vencer Negociação</title>
        </Head>
        <div className={styles.bg}>

            <Header/>
            


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