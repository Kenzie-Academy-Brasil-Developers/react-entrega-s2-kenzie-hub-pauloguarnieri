import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from '../pages/Dashboard';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
function Routes() {

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@KenzieHub:token'));
        if (token) {
            return setAuthenticated(true);
        }
    }, [authenticated]);

    return (
        <Switch>
            <Route exact path='/'>
                <Login authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Route>
            <Route path='/signup'>
                <Signup authenticated={authenticated} />
            </Route>
            <Route path='/dashboard'>
                <Dashboard />
            </Route>
        </Switch>
    )
}
export default Routes;