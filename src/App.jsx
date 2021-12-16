import { useState, useCallback, useMemo } from "react"
import "./App.css"
import FormText from "./components/FormText/FormText.jsx"

import firstNameValidator from "./components/FormText/validators/firstNameValidator"
import emailValidator from "./components/FormText/validators/emailValidator"
import phoneValidator from "./components/FormText/validators/phoneValidator"

export default function App({
  defaultFormValues = {
    first_name: "",
    last_name: "",
    phone: "",
    email: ""
  }
}) {
  const validators = useMemo(
    () => ({
      first_name: firstNameValidator,
      email: emailValidator,
      phone: () => {}
    }),
    []
  )

  const [form, setForm] = useState(defaultFormValues)
  const [focused, setFocused] = useState({})
  const [dirty, setDirty] = useState({})

  const [validation, setValidation] = useState({})

  const validate = useCallback((fieldName, value, rules = () => {}) => {
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: rules(value)
    }))
  }, [])

  const onFormReset = useCallback((event) => {
    event.preventDefault()
    setValidation({})
    setFocused({})
    setForm((prevForm) =>
      Object.keys(prevForm).reduce(
        (object, key) => ({ ...object, [key]: "" }),
        {}
      )
    )
  }, [])

  const onFocus = useCallback((event) => {
    setFocused((prevFocused) => ({
      ...prevFocused,
      [event.target.name]: true
    }))
  }, [])

  const onBlur = useCallback(
    (event) => {
      setDirty((prevDirty) => ({
        ...prevDirty,
        [event.target.name]: true
      }))

      validate(
        event.target.name,
        event.target.value,
        validators[event.target.name]
      )
      setFocused((prevTouched) => ({
        ...prevTouched,
        [event.target.name]: false
      }))
    },
    [validate, validators]
  )

  const onChange = useCallback((event) => {
    validate(
      event.target.name,
      event.target.value,
      validators[event.target.name]
    )

    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value
      }
    })
  }, [])

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault()
      Object.keys(form).forEach((name) => {
        console.log(name, form[name], validators[name])
        validate(name, form[name], validators[name])
      })
    },
    [form, validate, validators]
  )

  return (
    <div className="App">
      <form className="App__form" onChange={() => {}}>
        <FormText
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={form.first_name}
          errors={validation.first_name}
          focused={focused.first_name}
          dirty={dirty.first_name}
          label="First Name"
          name="first_name"
        />
        <FormText
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={form.last_name}
          errors={validation.last_name}
          focused={focused.last_name}
          dirty={dirty.last_name}
          label="Second Name"
          name="last_name"
        />
        <FormText
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={form.phone}
          errors={validation.phone}
          focused={focused.phone}
          dirty={dirty.phone}
          label="Phone"
          name="phone"
        />
        <FormText
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={form.email}
          errors={validation.email}
          focused={focused.email}
          dirty={dirty.email}
          label="Email"
          name="email"
        />
        <FormText
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          value={form.address}
          errors={validation.address}
          focused={focused.address}
          dirty={dirty.address}
          label="Address"
          name="address"
        />
        <div className="App__buttons">
          <button type="submit" onClick={onSubmit}>
            Send
          </button>
          <button type="reset" onClick={onFormReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
