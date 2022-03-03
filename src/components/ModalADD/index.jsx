import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './styles.css';
import { toast } from 'react-toastify';
import api from '../../services/api';

function ModalAddTech({ setModalADD, loadTechs }) {

    const { register, handleSubmit } = useForm()

    const [token] = useState(JSON.parse(localStorage.getItem('@KenzieHub:token')) || '')

    function addTech(tech) {

        api.post('/users/techs', tech,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                loadTechs()
                setModalADD(false)
            })
            .catch((err) => toast.error('Nome de tecnologia invalido'))
    }

    return (
        <div className='modal-layer'>
            <div className='modal-add'>
                <div className='modal-add-title'>
                    <h3>Cadastrar Tecnologia</h3>
                    <button onClick={() => setModalADD(false)} >X</button>
                </div>
                <form onSubmit={handleSubmit(addTech)}>
                    <label htmlFor="">Nome</label>
                    <input type="text" placeholder='tecnologia' {...register('title')} />
                    <label htmlFor="">Selecionar status</label>
                    <select {...register('status')}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                    </select>
                    <button type='submit'>Cadastrar tecnologia</button>
                </form>
            </div>
        </div>
    )
}
export default ModalAddTech;



