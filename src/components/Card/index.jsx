import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { useState } from 'react';
import './styles.css';



function Card({ item: { title, status, id }, loadTechs }) {

    const { register, handleSubmit } = useForm();

    const [token] = useState(JSON.parse(localStorage.getItem('@KenzieHub:token')) || '')

    const [modalEdit, setModalEdit] = useState(false);

    function editTech(tech) {

        api.put(`/users/techs/${id}`, tech,
            { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                loadTechs()
                setModalEdit(false)
            })
            .catch(err => toast.error('algum erro ocorreu tente novamente'))
    }

    function deleteTech(id) {

        api.delete(`/users/techs/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                toast.success('tecnologia apagada')
                loadTechs()
                setModalEdit(false)
            })
            .catch(err => toast.error('um erro ocorreu'))
    }

    return (
        <>
            <div className='card' onClick={() => setModalEdit(!modalEdit)}>
                <h3>{title}</h3>
                <h3>{status}</h3>
            </div>
            {modalEdit &&
                <div className='modal-edit-layer'>
                    <div className='modal-edit'>
                        <div className='modal-edit-title'>
                            <h3>Tecnologia Detalhes</h3>
                            <button onClick={() => setModalEdit(!modalEdit)}>X</button>
                        </div>
                        <form onSubmit={handleSubmit(editTech)} >
                            <label>Nome do projeto</label>
                            <p>{title}</p>
                            <label >Status</label>
                            <select {...register('status')}>
                                <option value="Iniciante">Iniciante</option>
                                <option value="Intermediário">Intermediário</option>
                                <option value="Avançado">Avançado</option>
                            </select>
                            <button type='submit'>Salvar alterações</button>
                        </form>
                        <button className='modal-edit-deleteButton' onClick={() => deleteTech(id)}>Delete</button>
                    </div>
                </div >}
        </>
    )
}
export default Card;