import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Photos from './containers/Photos';
import UserGallery from './containers/UserGallery';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Photos/>}/>
                <Route path='/photos' element={<Photos/>}/>
                <Route path='/userGallery/:id' element={<UserGallery/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
