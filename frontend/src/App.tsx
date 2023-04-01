import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home';
import Register from './features/users/Register';
import Login from './features/users/Login';
import Photos from './containers/Photos';
import UserGallery from './containers/UserGallery';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import {useAppSelector} from './app/hook';
import {selectUser} from './features/users/usersSlice';
import MyGallery from './containers/MyGallery';

function App() {
    const user = useAppSelector(selectUser);
    return (
        <Routes>
            <Route path='/' element={<Home/>}>
                <Route path='/' element={<Photos/>}/>
                <Route path='/photos' element={<Photos/>}/>
                <Route path='/userGallery/:id' element={<UserGallery/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/my-gallery' element={(
                    <ProtectedRoute isAllowed={user && Boolean(user)}>
                        <MyGallery/>
                    </ProtectedRoute>
                )}/>
            </Route>
            <Route path='*' element={(<h1>Not found!</h1>)}/>
        </Routes>
    );
}

export default App;
