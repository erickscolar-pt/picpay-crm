import { useContext  } from 'react'
import styles from './styles.module.scss';
import btnback from '../../../public/btn-back.png'
import btnexit from '../../../public/btn-ext.png'
import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../contexts/AuthContexts';

export default function Header(){

    const { signOut } = useContext(AuthContext)

    return(
        <header className={styles.header}>
            <div className={styles.buttons}>
                <div className={styles.btnexit} onClick={signOut}>
                    <Image
                        src={btnexit}
                    />
                </div>
                <div className={styles.btnback} >
                    <Image
                        src={btnback}
                    />
                </div>


            </div>
        </header>
    )
}