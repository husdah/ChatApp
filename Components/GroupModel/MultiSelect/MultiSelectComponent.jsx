import React, { useEffect, useRef, useContext } from 'react';
import $ from 'jquery';
import 'select2';
import { ChatAppContext } from '../../../Context/ChatAppContext';

const MultiSelectComponent = ({ options, placeholder }) => {
  const selectRef = useRef(null);

  const { setNewGroupMembers, account } = useContext(ChatAppContext);

  // Update members state on select change
  const handleSelectChange = () => {
    const selectedValues = $(selectRef.current).val();
    if (selectedValues && selectedValues.length > 0) {
      setNewGroupMembers(selectedValues.includes(account) ? selectedValues : [...selectedValues, account]);
    }
  };  

  useEffect(() => {
    $(selectRef.current).select2({
      width: 'style',
      placeholder: placeholder,
      allowClear: true, // Assuming you want to allow clear option
    });

    // Set up event listener for select change
    $(selectRef.current).on('change', handleSelectChange);

    return () => {
      $(selectRef.current).select2('destroy');
      $(selectRef.current).off('change', handleSelectChange);
    };
  }, [placeholder, handleSelectChange]);

  return (
    <select ref={selectRef} multiple style={{width: '100%'}}>
      {options.map((option, index) => (
        <option key={index} value={option.pubkey}>{option.name}</option>
      ))}
    </select>
  );
};

export default MultiSelectComponent;