function DropDown({ label, options, optionLabelKey, optionValueKey, onChange }) {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue); // Call onChange with the selected value
  };

  return (
    <div className="flex flex-col gap-3">
      <label>{label}</label>
      <select onChange={handleSelectChange}>
        {options.map(option => (
          <option key={option[optionValueKey]} value={option[optionValueKey]}>
            {option[optionLabelKey]} 
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
