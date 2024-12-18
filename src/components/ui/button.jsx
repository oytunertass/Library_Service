
export function Button({ children, variant = 'solid', className = '', ...props }) {
  const baseStyle = 'py-2 px-4 font-semibold rounded-md';
  const variantStyle =
    variant === 'outline'
      ? 'border border-gray-300 text-gray-700 bg-white'
      : 'bg-blue-500 text-white';

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}
