const NameFilter = ({ value, handleChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={handleChange} />
    </div>
  );
};
export default NameFilter;
