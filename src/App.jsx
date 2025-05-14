import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NoteView from './pages/NoteView';
import { getUserSession } from './redux/AuthSlice';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './router/ProtectedRoute';
import PublicRoute from './router/PublicRoute';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserSession());
  }, [dispatch]);


  return (
    <>
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        <Route path="/note/:link" element={<ProtectedRoute><NoteView /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App
