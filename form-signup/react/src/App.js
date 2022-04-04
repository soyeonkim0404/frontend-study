import './App.css'
import Form from './components/Form'
import Footer from './components/Footer'
import FontControlBox from './components/FontControlBox'
import Modal from './components/Modal'
import { createContext, useState } from 'react'

const initialFormData = {
    id: '',
    pw: '',
    comfirmPw: '',
}

export const FormContext = createContext({
    formData: initialFormData,
    setFormData: () => {},
})

function App() {
    const [formData, setFormData] = useState(initialFormData)
    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            <section className="form-wrapper">
                <Form />
                <Footer />
            </section>
            <FontControlBox />
            <Modal />
        </FormContext.Provider>
    )
}

export default App
