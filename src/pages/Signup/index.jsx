import { useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Signup({ authenticated }) {

    const schema = yup.object().shape({
        name: yup.string().required('Campo obrigatório'),
        email: yup.string().required('Campo obrigatório').email('Email invalido'),
        password: yup.string().required('Campo obrigatório').min(6, 'minimo de 6 digitos'),
        passwordConfirm: yup.string().required('Campo obrigatório').oneOf([yup.ref('password')], 'Senhas diferentes0'),
        contact: yup.string().required('campo obrigatório'),
        bio: yup.string().required('Campo obrigatório'),
        course_module: yup.string().required('campo obritorio')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const history = useHistory();

    const onSubmitFunction = ({ name, email, password, contact, bio, course_module }) => {
        const user = { name, email, password, contact, bio, course_module };

        console.log(user)
        api.post('/users', user)
            .then(_ => {
                toast.success('sucesso ao criar a conta')
                return history.push('/');
            })
            .catch((err) => toast.error('Erro ao criar a conta tente outro email'))
    }

    if (authenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className='signup-page'>
            <div>
                <form onSubmit={handleSubmit(onSubmitFunction)}>
                    <h2>Cadastro</h2>
                    <input type="text" {...register('name')} />
                    {errors.name?.message}
                    <input type="text" {...register('email')} />
                    {errors.email?.message}
                    <input type="text" {...register('password')} />
                    {errors.password?.message}
                    <input type="text" {...register('passwordConfirm')} />
                    {errors.passwordConfirm?.message}
                    <input type="text" {...register('contact')} />
                    {errors.contact?.message}
                    <input type="text" {...register('bio')} />
                    {errors.bio?.message}
                    <input type='text' {...register('course_module')} />
                    {errors.course_module?.message}
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}
export default Signup;