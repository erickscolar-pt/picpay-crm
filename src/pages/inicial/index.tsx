import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import Head from "next/head";
import Header from '../../components/Header'
import Footer from "../../components/Footer";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { FormEvent, Key, useEffect, useState } from "react";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { url } from "inspector";
import { ModalCriaUsuario } from '../../components/ModalCriaUsuario'
import Modal from 'react-modal'

type SearchProps = {
    documento?: string;
}
type ItemProps = {
    doc_atnd: string,
    dtvcn_atnd: Date,
    idatnd_atnd: number,
    idmtv_atnd: number,
    idusu_atnd: number,
    nome_atnd: string,
    origem_atend: number,
    plano_atnd: number,
    tabul_atnd: string,
    tel_atnd: string,
    vldem_atnd: number,
    vlent_atnd: number,
    dtcad_atnd: Date
}
interface ListaAtendimento{
    [x: string]: any;
    listaatendimento: ItemProps[]
}
export default function Inicial(){
    const [search, setSearch] = useState<SearchProps>()
    const [documento, setDocumento] = useState('')
    const [activeTable, setActiveTable] = useState(false)
    const [listAtendimento, setListAtendimento] = useState<ListaAtendimento>()
    const [nivelid, setNivelId] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)

    let active = activeTable;
    
    function aTable(e: boolean){
        //console.log(e)
        setActiveTable(e)
    }

    useEffect(() => {
        if (window) { 
          // set props data to session storage or local storage  
          setNivelId(parseInt(sessionStorage.getItem('nivel')))
        }
    }, []);
    
    const nivel = nivelid;

    
    async function handleSearch(event: FormEvent){
        event.preventDefault();


            if(documento === ""){
                toast.warning("Insira o CPF para busca.")
                aTable(false)
                return;
            }

            const api = setupAPIClient();
            const response:any = await api.post('/atendimento/findDocumento',{
                documento
            } );
            //console.log(response.data[0].status)

            if(response.data[0].status === false){
                aTable(false)
                toast.warning("Não foi encontrado nenhum atendimento para este CPF")
                return;
            }
            const listaatendimento: ListaAtendimento = response.data[0].novo;
            setListAtendimento(listaatendimento)


    }


    function handleCloseModal(){
        setModalVisible(false);
    }

    async function modal(){
        //alert('modal')

        const api = setupAPIClient();
/*         const response = await api.post('/auth/signup',{

        }) */

        setModalVisible(true)
    }

    Modal.setAppElement('#__next');

    return(
        <>
        <Head>
            <title>PicPay - Inicial</title>
        </Head>
        <div className={styles.bg}>

            <Header/>
            
            <div className={styles.atendimentos}>
                <form className={styles.search} 
                      onSubmit={handleSearch}
                      >
                    <input type="text" 
                    placeholder="Insira o CPF para realizar a busca"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    />
                    <button type="submit"
                    onClick={()=>{aTable(true)}}
                    >
                        <FaSearch
                            color="#fff"
                            size={14}
                        />
                    </button>
                </form>
                {activeTable === true ? 
                                    <div className={styles.table}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Data</th>
                                                <th>Tipo</th>
                                                <th>Ocorrencia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listAtendimento?.map((lista)=>{
                                                return(
                                                        <tr key={lista.idatnd_atnd}>
                                                            <td>{lista.idatnd_atnd}</td>
                                                            <td>{lista.dtcad_atnd == null ? 'Sem data' : lista.dtcad_atnd}</td>
                                                            <td>{lista.origem_atend === 1 ? 'Acordo' :
                                                                 lista.origem_atend === 2 ? 'Atendimento Vencido' :
                                                                 lista.origem_atend === 3 ? 'Atendimento A Vencer' :
                                                                 'Sem atendimento'}</td>
                                                            <td>{lista.tabul_atnd}</td>
                                                        </tr>
                                                )
                                            })}
                
                                        </tbody>
                                    </table>
                                </div>
                    :<div></div>}

                <div className={styles.btnatendimento}>
                    <Link href="/vencidonegociacao"><button type="button">Atendimento - Vencido</button></Link>
                    <Link href="/avencernegociacao"><button type="button">Atendimento - A Vencer</button></Link>
                </div>
                {
                    nivel == 1 ?
                    <div className={styles.btnatendimento}>
                        <button type="button" onClick={modal}>Criar Usuario</button>
                        <Link href="/avencernegociacao"><button type="button">Relatorios</button></Link>
                    </div>
                    : 
                    <div></div>
                }
            </div>

            <Footer/>
            { modalVisible && (
                <ModalCriaUsuario
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                />
            )}
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx)=>{


    return{
        props:{

        }
    }
})