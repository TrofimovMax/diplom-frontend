import Heading from '/src/components/Heading';
import styles from '/src/styles/Category.module.css';
import Link from "next/link";
import {useRouter} from "next/router";

const categories = [
    { id: 1, title: 'ForKids', path: '/category/for-kids' },
    { id: 2, title: 'Gyms', path: '/category/gyms' },
    { id: 3, title: 'SwimmingPool', path: '/category/swimming-pools' },
];
const Category = () => {
    const { pathname } = useRouter();

    return (
        <div className={styles.wrapper}>
            <Heading text='Category'/>
            <div className="filter">
                {categories.map(({id, title, path}) => {
                        return (
                            <Link className={styles.filterLink}
                                  active={pathname === path ? true : null}
                                  key={id}
                                  href={path}>
                                <div> {title} </div>
                            </Link>
                        )
                    }
                )}
            </div>
            <p>This place of description sports sections in sport palace.</p>
        </div>
    );
}
export default Category;