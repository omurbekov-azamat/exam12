import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/register' element={<Register/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
