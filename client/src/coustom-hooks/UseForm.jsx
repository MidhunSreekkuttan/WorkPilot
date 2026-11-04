import React from "react"
import { useState } from "react"

function useForm(initialState) {

    const [values, setValues] = useState(initialState)

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    return { values, handleChange }
}

export default useForm