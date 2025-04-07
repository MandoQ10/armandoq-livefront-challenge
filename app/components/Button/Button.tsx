function Button({ label = "Click me", onClick, isDisabled = false, isLoading = false}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={isDisabled}
      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >
      { isLoading ? 'Loading Results' : label }
    </button>
  );
}

export default Button;