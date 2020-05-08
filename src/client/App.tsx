import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import NewBlog from './pages/NewBlog'
import Details from './pages/Details'
import Admin from './pages/auth/admin'
import Edit from './pages/Edit'
import LogIn from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './components/PrivateRoute';

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <Navbar />
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new" component={NewBlog} />
                    <Route exact path="/:id/details" component={Details} />
                    <PrivateRoute exact path="/admin" component={Admin}>
                        <Admin />
                    </PrivateRoute>
                    <Route exact path="/:id/edit" component={Edit} />
                    <Route exact path="/login" component={LogIn} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </main>
        </BrowserRouter>
    )
}

interface AppProps { };

export default App;
