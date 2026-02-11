import React from 'react';

interface Option {
  code: string;
  name: string;
}

interface SearchableSelectProps {
  label: string;
  placeholder: string;
  options: Option[];
  onSelect: (value: string) => void;
  disabled?: boolean;
  value: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ label, placeholder, options, onSelect, disabled, value }) => {
  const dataListId = `datalist-${label.replace(/\s+/g, '-')}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(option => option.name.toLowerCase() === selectedValue.toLowerCase());
    if (selectedOption) {
      onSelect(selectedOption.code);
    }
  };

  return (
    <div className="w-full mb-4">
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 text-left">{label}</label>
      <div className="relative">
        <input
          list={dataListId}
          placeholder={placeholder}
          onChange={handleInputChange}
          disabled={disabled}
          className="block w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-0 focus:border-apvs-blue-900 transition-colors bg-gray-50 dark:bg-gray-800"
        />
        <datalist id={dataListId}>
          {options.map(option => (
            <option key={option.code} value={option.name} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default SearchableSelect;