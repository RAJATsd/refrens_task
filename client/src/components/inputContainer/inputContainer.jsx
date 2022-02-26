import './inputContainer.css';
import React from 'react'

const InputContainer = () => {
  return (
    <div className="input-container">
        <input type="text" className="search-input" placeholder='search user by ID,address,name,items or pincode' />
    </div>
  )
}

export default InputContainer