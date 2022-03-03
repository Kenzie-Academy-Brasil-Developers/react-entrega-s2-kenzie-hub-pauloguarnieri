import './styles.css'
import { useEffect, useState } from 'react';
import api from '../../services/api';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ModalAddTech from '../../components/ModalADD';


function Dashboard({ authenticated, logout }) {

    const [techs, setTechs] = useState([]);

    const [modalADD, setModalADD] = useState(false);

    const [user] = useState(JSON.parse(localStorage.getItem('@KenzieHub:user')))


    function loadTechs() {
        api.get(`/users/${user.id}`)
            .then(response => {
                setTechs(response.data.techs)
            })
            .catch(err => toast.error('não deu'))
    }

    useEffect(() => {
        loadTechs();
    }, [])


    if (!authenticated) {
        return <Redirect to='/' />
    }

    return (
        <div className='page-dashboard'>
            <Header logout={logout} />
            <div className='main-welcome'>
                <h2>{`Olá, ${user.name}`}</h2>
                <div>
                    <h3>{user.course_module}</h3>
                </div>
            </div>
            <div className='page-main' >
                <div className='tech-add'>
                    <div className='tech-add-nav'>
                        <h3>Tecnologias</h3>
                        <button onClick={() => setModalADD(!modalADD)} >+</button>
                    </div>
                    {modalADD && <ModalAddTech setModalADD={setModalADD} loadTechs={loadTechs} />}
                </div>
                <CardList techs={techs} loadTechs={loadTechs} />
            </div>
        </div>
    )
}
export default Dashboard;