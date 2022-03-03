import './styles.css';

function Header({ logout }) {
    return (
        <header className='header'>
            <h1 className='header-logo'>Kenzie Hub</h1>
            <button onClick={() => logout()}>Sair</button>
        </header>
    )
}
export default Header;