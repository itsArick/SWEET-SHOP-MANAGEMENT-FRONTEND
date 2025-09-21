import { useState, useCallback } from 'react';

export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    for (const rule of rules) {
      const error = rule(value, values);
      if (error) return error;
    }
    return null;
  }, [validationRules, values]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, values[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, validationRules, values]);

  const setValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
    
    // Validate field when it's touched
    if (isTouched) {
      const error = validateField(name, values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [validateField, values]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setFieldTouched(name, true);
  }, [setFieldTouched]);

  // FIXED: Now properly handles the event object and prevents default submission
  const handleSubmit = useCallback((e, submitFunction) => {
    e.preventDefault(); // Prevent default form submission
    
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(values).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    // Validate form
    const isValid = validateForm();
    
    if (isValid) {
      // Call the submit function and handle any errors
      submitFunction(values).catch(error => {
        console.error('Form submission error:', error);
      }).finally(() => {
        setIsSubmitting(false);
      });
    } else {
      setIsSubmitting(false);
    }
    
    return isValid;
  }, [values, validateForm]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setFieldTouched,
    setFieldError,
    validateForm,
    resetForm,
    isValid: Object.keys(errors).length === 0,
  };
};

// Validation helpers
export const validationRules = {
  required: (message = 'This field is required') => (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message;
    }
    return null;
  },

  email: (message = 'Please enter a valid email address') => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return message;
    }
    return null;
  },

  minLength: (min, message) => (value) => {
    if (value && value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max, message) => (value) => {
    if (value && value.length > max) {
      return message || `Must be no more than ${max} characters`;
    }
    return null;
  },

  minValue: (min, message) => (value) => {
    if (value && Number(value) < min) {
      return message || `Must be at least ${min}`;
    }
    return null;
  },

  maxValue: (max, message) => (value) => {
    if (value && Number(value) > max) {
      return message || `Must be no more than ${max}`;
    }
    return null;
  },

  matchField: (fieldName, message) => (value, allValues) => {
    if (value !== allValues[fieldName]) {
      return message || `Must match ${fieldName}`;
    }
    return null;
  },
};








// import { useState, useCallback } from 'react';

// export const useForm = (initialValues = {}, validationRules = {}) => {
//   const [values, setValues] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateField = useCallback((name, value) => {
//     const rules = validationRules[name];
//     if (!rules) return null;

//     for (const rule of rules) {
//       const error = rule(value, values);
//       if (error) return error;
//     }
//     return null;
//   }, [validationRules, values]);

//   const validateForm = useCallback(() => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(validationRules).forEach(field => {
//       const error = validateField(field, values[field]);
//       if (error) {
//         newErrors[field] = error;
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   }, [validateField, validationRules, values]);

//   const setValue = useCallback((name, value) => {
//     setValues(prev => ({ ...prev, [name]: value }));
    
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: null }));
//     }
//   }, [errors]);

//   const setFieldTouched = useCallback((name, isTouched = true) => {
//     setTouched(prev => ({ ...prev, [name]: isTouched }));
    
//     // Validate field when it's touched
//     if (isTouched) {
//       const error = validateField(name, values[name]);
//       setErrors(prev => ({ ...prev, [name]: error }));
//     }
//   }, [validateField, values]);

//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     const fieldValue = type === 'checkbox' ? checked : value;
//     setValue(name, fieldValue);
//   }, [setValue]);

//   const handleBlur = useCallback((e) => {
//     const { name } = e.target;
//     setFieldTouched(name, true);
//   }, [setFieldTouched]);

//   const handleSubmit = useCallback(async (submitFunction) => {
//     setIsSubmitting(true);
    
//     // Mark all fields as touched
//     const touchedFields = {};
//     Object.keys(values).forEach(key => {
//       touchedFields[key] = true;
//     });
//     setTouched(touchedFields);

//     // Validate form
//     const isValid = validateForm();
    
//     if (isValid) {
//       try {
//         await submitFunction(values);
//       } catch (error) {
//         console.error('Form submission error:', error);
//       }
//     }
    
//     setIsSubmitting(false);
//     return isValid;
//   }, [values, validateForm]);

//   const resetForm = useCallback(() => {
//     setValues(initialValues);
//     setErrors({});
//     setTouched({});
//     setIsSubmitting(false);
//   }, [initialValues]);

//   const setFieldError = useCallback((name, error) => {
//     setErrors(prev => ({ ...prev, [name]: error }));
//   }, []);

//   return {
//     values,
//     errors,
//     touched,
//     isSubmitting,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     setValue,
//     setFieldTouched,
//     setFieldError,
//     validateForm,
//     resetForm,
//     isValid: Object.keys(errors).length === 0,
//   };
// };

// // Validation helpers
// export const validationRules = {
//   required: (message = 'This field is required') => (value) => {
//     if (!value || (typeof value === 'string' && !value.trim())) {
//       return message;
//     }
//     return null;
//   },

//   email: (message = 'Please enter a valid email address') => (value) => {
//     if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
//       return message;
//     }
//     return null;
//   },

//   minLength: (min, message) => (value) => {
//     if (value && value.length < min) {
//       return message || `Must be at least ${min} characters`;
//     }
//     return null;
//   },

//   maxLength: (max, message) => (value) => {
//     if (value && value.length > max) {
//       return message || `Must be no more than ${max} characters`;
//     }
//     return null;
//   },

//   minValue: (min, message) => (value) => {
//     if (value && Number(value) < min) {
//       return message || `Must be at least ${min}`;
//     }
//     return null;
//   },

//   maxValue: (max, message) => (value) => {
//     if (value && Number(value) > max) {
//       return message || `Must be no more than ${max}`;
//     }
//     return null;
//   },

//   matchField: (fieldName, message) => (value, allValues) => {
//     if (value !== allValues[fieldName]) {
//       return message || `Must match ${fieldName}`;
//     }
//     return null;
//   },
// };