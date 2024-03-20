import React from 'react';

const FormField = ({ index, field, handleChange, removeField }) => {
    const handleFieldChange = (e) => {
        handleChange(index, e.target.value);
    };

    return (
        <div>
            <label>
                Field {index + 1}
                <button onClick={() => removeField(index)}>Remove</button>

            </label>
            {field.type === 'text' && (
                <input
                    type="text"
                    value={field.value}
                    onChange={handleFieldChange}
                    placeholder="Text Input"
                />
            )}
            {field.type === 'dropdown' && (
                <select value={field.value} onChange={handleFieldChange}>
                    <option value="">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            )}
            {field.type === 'checkbox' && (
                <input
                    type="checkbox"
                    checked={field.value}
                    onChange={() => handleChange(index, !field.value)}
                />
            )}
            {field.type === 'radio' && (
                <div>
                    <input
                        type="radio"
                        name={`radio-${index}`}
                        value="option1"
                        checked={field.value === 'option1'}
                        onChange={handleFieldChange}
                    />
                    Option 1
                    <input
                        type="radio"
                        name={`radio-${index}`}
                        value="option2"
                        checked={field.value === 'option2'}
                        onChange={handleFieldChange}
                    />
                    Option 2
                </div>
            )}
        </div>
    );
};

export default FormField;
