import './styles.css';
import Card from '../Card';

function CardList({ techs, loadTechs }) {
    console.log(techs, ' cardlists techs')
    return (
        <div className='card-list'>
            {techs.map((item, index) => <Card item={item} key={index} loadTechs={loadTechs} />)}
        </div>
    )
}
export default CardList;