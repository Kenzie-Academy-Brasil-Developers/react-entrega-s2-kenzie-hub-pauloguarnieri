import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
function Routes() {

    const [authenticated, setAuthenticated] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@KenzieHub:token'));
        if (token) {
            return setAuthenticated(true);
        }
    }, [authenticated]);


    function logout() {
        localStorage.clear();
        if (authenticated) {
            setAuthenticated(false);
            <Redirect to='/' />
        } else {
            history.push('/');
        }
    }

    return (
        <Switch>
            <Route exact path='/'>
                <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Route>
            <Route path='/signup'>
                <Signup authenticated={authenticated} logout={logout} />
            </Route>
            <Route path='/dashboard'>
                <Dashboard authenticated={authenticated} logout={logout} />
            </Route>
        </Switch>
    )
}
export default Routes;