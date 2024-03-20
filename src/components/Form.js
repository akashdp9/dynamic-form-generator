import React, { useState } from 'react';
import FormField from './FormField';

const Form = () => {
    const [fields, setFields] = useState([]);
    const [selectedFieldType, setSelectedFieldType] = useState('text');
    const [dropdownOptions, setDropdownOptions] = useState('');
    const [errors, setErrors] = useState([]);

    const addField = () => {
        if (selectedFieldType === 'dropdown') {
            setFields([...fields, { type: selectedFieldType, value: '', options: dropdownOptions.split(',') }]);
        } else {
            setFields([...fields, { type: selectedFieldType, value: '' }]);
        }
    };

    const removeField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
    };

    const handleChange = (index, value) => {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        setFields(updatedFields);
    };

    const validateForm = () => {
        const errors = [];
        fields.forEach((field, index) => {
            if (field.type === 'text' || field.type === 'textarea') {
                if (field.value.trim() === '') {
                    errors.push(`Field ${index + 1} is required.`);
                }
            }
        });
        setErrors(errors);
        return errors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // Handle form submission here
            console.log('Form submitted successfully:', fields);
        } else {
            console.log('Form contains errors:', errors);
        }
    };

    const saveConfig = () => {
        const configData = JSON.stringify(fields);
        // Save configData as needed (e.g., to local storage)
        localStorage.setItem('formConfig', configData);
        console.log('Form configuration saved:', configData);
    };

    const loadConfig = () => {
        // Load saved configuration (e.g., from local storage)
        const savedConfigData = localStorage.getItem('formConfig');
        if (savedConfigData) {
            const parsedConfig = JSON.parse(savedConfigData);
            setFields(parsedConfig);
            console.log('Form configuration loaded:', parsedConfig);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fieldType">Field Type:</label>
                    <select
                        id="fieldType"
                        value={selectedFieldType}
                        onChange={(e) => setSelectedFieldType(e.target.value)}
                    >
                        <option value="text">Text Input</option>
                        <option value="textarea">Text Area</option>
                        <option value="dropdown">Dropdown</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="radio">Radio Button</option>
                    </select>
                    {selectedFieldType === 'dropdown' && (
                        <input
                            type="text"
                            placeholder="Enter options separated by commas"
                            value={dropdownOptions}
                            onChange={(e) => setDropdownOptions(e.target.value)}
                        />
                    )}
                    <button type="button" onClick={addField}>Add Field</button>
                </div>
                {errors.length > 0 && (
                    <div className="errors">
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                {fields.map((field, index) => (
                    <FormField
                        key={index}
                        index={index}
                        field={field}
                        handleChange={handleChange}
                        removeField={removeField}
                    />
                ))}
                <button type="submit">Submit</button>
            </form>
            <div>
                <button onClick={saveConfig}>Save Configuration</button>
                <button onClick={loadConfig}>Load Configuration</button>
            </div>
        </div>
    );
};

export default Form;
