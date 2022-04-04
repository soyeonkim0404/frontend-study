import { FormContext } from '../App'
import { useContext, useRef } from 'react'

const ID_REGEX = new RegExp('^[a-z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

const FormInput = ({ id, label, inputProps }) => {
    const inputRef = useRef(null)
    const { formData, setFormData } = useContext(FormContext)

    const checkRegex = () => {
        const value = formData[id]
        if (value.length === 0) {
            return 'required'
        } else {
            switch (id) {
                case 'id':
                    return ID_REGEX.test(value) ? true : 'invaildId'
                case 'pw':
                    return PW_REGEX.test(value) ? true : 'invaildPw'
                case 'confirmPw':
                    return value === formData['pw'] ? true : 'invaildPwChk'
                default:
                    return
            }
        }
    }

    return (
        <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                {...inputProps}
                value={formData[id]}
                onChange={(e) =>
                    setFormData({ ...formData, [id]: e.target.value })
                }
                placeholder="아이디를 입력해주세요."
            />
            <div className="mt-1 mb-3 text-xs text-red-500" />
        </div>
    )
}

export default FormInput
