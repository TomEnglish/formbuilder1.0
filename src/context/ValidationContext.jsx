import React, { createContext, useState, useCallback } from 'react';

// Provide a default value matching the provider's shape
export const ValidationContext = createContext({
  validationErrors: {},
  validateField: () => ({ isValid: true }),
  setFieldError: () => {},
  clearFieldError: () => {},
  validateForm: () => true,
});

// Basic validation rules (can be expanded)
const validationRules = {
  required: (value) => (value && value.trim() !== '' ? { isValid: true } : { isValid: false, message: 'This field is required.' }),
  contentLength: (value, min, max) => {
    const textContent = value.replace(/<[^>]*>?/gm, ''); // Strip HTML tags for length check
    if (textContent.length < min) {
      return { isValid: false, message: `Content must be at least ${min} characters long.` };
    }
    if (textContent.length > max) {
      return { isValid: false, message: `Content must not exceed ${max} characters.` };
    }
    return { isValid: true };
  },
  numerical: (value) => {
    const num = Number(String(value).replace(/[^0-9.-]+/g,"")); // Allow numbers, decimals, negative
    return !isNaN(num) ? { isValid: true } : { isValid: false, message: 'Must be a valid number.' };
  },
  date: (value) => {
    // Basic date check (YYYY-MM-DD or MM/DD/YYYY), can be made more robust
    const datePattern = /^(?:\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4})$/;
    return datePattern.test(value) && !isNaN(new Date(value).getTime())
      ? { isValid: true }
      : { isValid: false, message: 'Must be a valid date (YYYY-MM-DD or MM/DD/YYYY).' };
  },
  // Add more rules as needed (e.g., email, specific formats)
};

export const ValidationProvider = ({ children }) => {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((value, ruleName, params = []) => {
    const rule = validationRules[ruleName];
    if (!rule) {
      console.warn(`Validation rule "${ruleName}" not found.`);
      return { isValid: true }; // Default to valid if rule doesn't exist
    }
    return rule(value, ...params);
  }, []);

  const setFieldError = useCallback((fieldName, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: message,
    }));
  }, []);

  const clearFieldError = useCallback((fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const validateForm = useCallback((formData, fieldRules) => {
    let formIsValid = true;
    const newErrors = {};
    for (const fieldName in fieldRules) {
      const value = formData[fieldName];
      const rules = fieldRules[fieldName]; // Can be a single rule string or array [ruleName, params]
      
      // Normalize rules to an array of rule definitions
      const rulesToApply = Array.isArray(rules[0]) ? rules : [rules]; 

      for(const ruleDef of rulesToApply) {
        const [ruleName, ...params] = ruleDef;
        const validation = validateField(value, ruleName, params);
        if (!validation.isValid) {
          newErrors[fieldName] = validation.message;
          formIsValid = false;
          break; // Stop checking other rules for this field if one fails
        }
      }
    }
    setErrors(newErrors);
    return formIsValid;
  }, [validateField]);


  const contextValue = {
    validationErrors: errors,
    validateField,
    setFieldError,
    clearFieldError,
    validateForm, // Add form validation utility
  };

  return (
    <ValidationContext.Provider value={contextValue}>
      {children}
    </ValidationContext.Provider>
  );
};