import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  const page = {
    '/add': { number: '01', title: 'Add a product', note: 'Build the next piece in the FOREVER edit.' },
    '/list': { number: '02', title: 'Product catalogue', note: 'Review the pieces currently available in your store.' },
    '/orders': { number: '03', title: 'Orders & fulfilment', note: 'Keep every customer order moving.' },
  }[location.pathname] || { number: '01', title: 'Store operations', note: 'Manage the FOREVER collection.' }

  return (
    <div className="admin-app">
      <ToastContainer
        position="top-right"
        autoClose={4200}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        className="admin-toast-container"
      />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <div className="admin-frame">
            <Sidebar />
            <main className="admin-main">
              <header className="admin-main-heading">
                <div>
                  <p className="admin-eyebrow">STORE OPERATIONS / {page.number}</p>
                  <h1>{page.title}</h1>
                  <p className="admin-page-note">{page.note}</p>
                </div>
                <span className="admin-currency-chip">INDIA <b>₹ INR</b></span>
              </header>
              <div className="admin-page-content">
                <Routes>
                  <Route path="/" element={<Navigate to="/add" replace />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route path="*" element={<Navigate to="/add" replace />} />
                </Routes>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  )
}

export default App