import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NoteView from './pages/NoteView'; // yeni import
import { getUserSession } from './redux/AuthSlice';
import ProfileSettings from './pages/ProfileSettings';


function App() {

  // Kullanıcı oturumunu kontrol etmek için gerekli olan Redux eylemini çağırıyoruz
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/note/:link" element={<NoteView />} /> {/* yeni route */}
        <Route path="/profile" element={<ProfileSettings />} />
      </Routes>
    </>
  )
}

export default App
