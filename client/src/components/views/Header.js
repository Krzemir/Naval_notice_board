import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <img 
      src={`${process.env.PUBLIC_URL}/header-img.jpg`} className='img-fluid shadow-4' alt='Notice Boat Board header' />
      <h1 className={styles.title}>Buy your dreams... here!</h1>
    </div>
    );
}
 
export default Header;