import { useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import './styles.css';

function Login({ authenticated, setAuthenticated }) {

    const schema = yup.object().shape({
        email: yup.string().required('Campo obrigatorio').email('Email Invalido'),
        password: yup.string().required('Campo obrigatorio').min(6, 'minimo de 6 digitos')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const history = useHistory();

    const onSubmitFunction = (data) => {
        console.log(data)
        api.post('/sessions', data)
            .then(response => {
                setAuthenticated(true);
                const { token, user } = response.data;

                localStorage.setItem('@KenzieHub:token', JSON.stringify(token))
                localStorage.setItem('@KenzieHub:user', JSON.stringify(user))

                return history.push('/dashboard')
            })
            .catch(err => toast.error('Email ou senha inválidos'))
    }

    if (authenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className='login-page'>
            <h1>Kenzie Hub</h1>
            <div className='login-container'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit(onSubmitFunction)} className='formulario'>
                    <label>Email</label>
                    <input type="text" placeholder='Email' {...register('email')} />
                    {errors.email?.message}
                    <label>Senha</label>
                    <input type="text" placeholder='Senha' {...register('password')} />
                    <button type='submit'>Entrar</button>
                </form>
                <span>Ainda não possui uma conta?</span>
                <button onClick={() => history.push('/signup')}>Cadastre-se</button>
            </div>
        </div>
    )
}
export default Login;