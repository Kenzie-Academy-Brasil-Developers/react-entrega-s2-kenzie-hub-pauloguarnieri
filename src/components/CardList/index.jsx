import './styles.css';
import Card from '../Card';

function CardList({ techs }) {
    return (
        <div className='card-list'>
            {techs.map((item, index) => <Card item={item} key={index} />)}
        </div>
    )
}
export default CardList;