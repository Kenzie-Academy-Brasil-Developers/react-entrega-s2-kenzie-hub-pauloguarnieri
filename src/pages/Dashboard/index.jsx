import './styles.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import CardList from '../../components/CardList';
import Header from '../../components/Header';


function Dashboard() {

    const [techs, setTechs] = useState([]);

    const user = JSON.parse(localStorage.getItem('@KenzieHub:user'))

    useEffect(() => {
        api.get(`/users/${user.id}`)
            .then(response => {
                console.log(response.data.techs, 'response.data')
                setTechs(response.data.techs)
                console.log('techs', techs)
            })

    }, [])


    const getls = () => {
        const oi = JSON.parse(localStorage.getItem('@KenzieHub:user'))
        console.log(oi.id)
    }


    return (
        <div className='page-dashboard'>
            <Header />
            <div className='main-welcome'>
                {/* <h2>{`Olá, ${user.name}`}</h2> */}
                <div>
                    {/* <h3>{user.course_module}</h3> */}
                </div>
            </div>
            <div className='page-main' >
                <div className='tech-add'>
                    <h3>Tecnologias</h3>
                    <button>+</button>
                </div>
                <CardList techs={techs} />
            </div>
            <button onClick={() => getls()}>AQUI</button>
        </div>
    )
}
export default Dashboard;