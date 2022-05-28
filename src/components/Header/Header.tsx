import { SignInButton } from '../signInButton/index'
import styles from './Styles.module.scss'
import { ActiveLink } from '../ActiveLink';


export function Header() {
   


    return (
        <header className={styles.headercontainer}>
            <div className={styles.headercontent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/" >
                        <a>Home</a>
                    </ActiveLink>
                    <ActiveLink activeClassName = {styles.active} href='/posts'>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}