function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={`border-t-transparent border-solid rounded-full animate-spin ${sizeClasses[size]} border-white`}>
    </div>
  );
}

export default LoadingSpinner;