import React, { useCallback, useEffect } from 'react'

export default function TextInput({
  required = true,
  regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9][a-zA-Z0-9-]*(?:\.[a-zA-Z0-9][a-zA-Z0-9-]*)+$/,
  type = 'text',
  label = 'Normal text input',
  invalidErrorMessage = 'invalid',
  requiredErrorMessage = 'required',
  minErrorMessage = 'min error',
  maxErrorMessage = 'max error',
  errorBorderColor = '#ff4242',
  disable = false,
  inputValue = 'asd'
}) {
  const [errorMessage, setErrorMessage] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  const [textValue, setTextValue] = React.useState(inputValue)
  const handleFocus = useCallback((e) => {
    setIsFocused(true)
  }, [])
  const handleValue = useCallback((e) => {
    setTextValue(e.target.value)
  }, [])
  const validation = useCallback(
    (value) => {
      if (isFocused) {
        if (required && value === '') {
          return setErrorMessage(requiredErrorMessage)
        } else if (regex.test(value) === false) {
          return setErrorMessage(invalidErrorMessage)
        } else if (value.length > 50) {
          return setErrorMessage(minErrorMessage)
        } else if (value.length < 0) {
          return setErrorMessage(maxErrorMessage)
        } else {
          setErrorMessage('')
        }
      } else {
        setErrorMessage('')
      }
    },
    [isFocused]
  )

  useEffect(() => {
    validation(textValue)
  }, [textValue, isFocused])

  useEffect(() => {
    console.log({
      value: textValue,
      valid: isFocused && errorMessage.length === 0
    })
  }, [errorMessage, isFocused])

  return (
    <div>
      TextInput
      <p>
        {label} {required && <span>*</span>}
      </p>
      <input
        type={type}
        onBlur={(e) => handleFocus(e)}
        onChange={(e) => handleValue(e)}
        style={{ borderColor: errorMessage ? errorBorderColor : 'transparent' }}
        disabled={disable}
        value={textValue}
      />
      {errorMessage && <h6>{errorMessage}</h6>}
    </div>
  )
}
