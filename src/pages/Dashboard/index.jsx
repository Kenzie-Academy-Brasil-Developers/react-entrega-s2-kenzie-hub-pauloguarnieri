import { useEffect, useState } from 'react';
import api from '../../services/api';

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
        <div>DASHBOARD
            <div>
                {techs.map((item, index) => <div key={index}><p>{item.title}</p><p>{item.status}</p></div>)}
            </div>
            <button onClick={() => getls()}>AQUI</button>
        </div>
    )
}
export default Dashboard;