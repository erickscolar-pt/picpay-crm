import { useContext  } from 'react'
import styles from './styles.module.scss';
import btnback from '../../../public/btn-back.png'
import btnexit from '../../../public/btn-ext.png'
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../contexts/AuthContexts';
import { useRouter } from 'next/router';

export default function Header(){

    const router = useRouter()
    const param = router.asPath

    var ocultabtn:boolean = false
    var backpage:string = ""


    if(param == '/inicial'){
        ocultabtn = true;
    }
    if(param == '/vencidonegociacao'){
        backpage = "/inicial"
    }

    if(param == '/vencidoatendimento'){
        backpage = "/vencidonegociacao"
    }

    if(param == '/avencernegociacao'){
        backpage = "/inicial"
    }
    //console.log(ocultabtn) 

    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.header}>
            <div className={styles.buttons}>
                <div className={styles.btnexit} onClick={signOut}>
                    <Image
                        src={btnexit}
                    />
                </div>
                {!ocultabtn ?
                            <Link
                            href={backpage}
                            >
                                <div className={styles.btnback} >
                                    <Image
                                        src={btnback}
                                    />
                                </div>
                            </Link>

                : <div></div>
                }
            </div>
        </header>
    )
}