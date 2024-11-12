import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import UserForm from './components/UserForm'
import ProductForm from './components/ProductForm'
import ProductTable from './components/ProductTable'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/product-form" element={<ProductForm />} />
        <Route path="/product-table" element={<ProductTable />} />
      </Routes>
    </Router>
  )
}

export default App