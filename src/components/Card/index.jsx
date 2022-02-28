import './styles.css';


function Card({ item: { title, status } }) {
    return (
        <div className='card'>
            <h3>{title}</h3>
            <h3>{status}</h3>
        </div>
    )
}
export default Card;