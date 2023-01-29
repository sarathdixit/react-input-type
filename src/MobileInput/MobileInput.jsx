import React, { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import styles from './MobileInput.module.css'

export default function MobileInput() {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  return (
    <div className={styles.mobileInputWrapper}>
      <PhoneInput
        international
        countryCallingCodeEditable={false}
        defaultCountry='IN'
        placeholder='Enter phone number'
        value={value}
        onChange={setValue}
      />
    </div>
  )
}
