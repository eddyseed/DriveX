import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext<any>(null);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [usedCarFormData, setUsedCarFormData] = useState({});

  return (
    <FormContext.Provider value={{ usedCarFormData, setUsedCarFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);