import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const navigation = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'History', path: '/history' },
    { id: 3, title: 'Category', path: '/category' },
];

const Navbar = () => {
    const { pathname } = useRouter();

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <Image src="/logo.svg" width={70} height={70} alt="logo" />
            </div>
            <div className={styles.links}>
                {navigation.map(({ id, title, path }) => {
                    return(
                        <Link className={styles.navButton}
                              active={pathname === path ? true : null}
                              key={id}
                              href={path}>
                            <div> {title} </div>
                        </Link>
                    )
                }
                )}
            </div>
        </nav>
    );
};

export default Navbar;