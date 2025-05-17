import React from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NoteView from './pages/NoteView';
import { getSession } from './redux/AuthSlice';
import ProfileSettings from './pages/ProfileSettings';
import ProtectedRoute from './router/ProtectedRoute';
import { useSelector } from 'react-redux';
import { supabase } from './config/supabaseClient';
import { setSession } from './redux/AuthSlice';
import PublicRoute from './router/PublicRoute';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  const dispatch = useDispatch();
  const { loading, initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSession());

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      dispatch(setSession(session));
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch]);

  if (loading && !initialized) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
        <Route path="/note/:link" element={<NoteView />} />
      </Routes>
    </>
  )
}

export default App
