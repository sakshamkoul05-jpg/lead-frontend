interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
};

const Spinner = ({ size = "md" }: SpinnerProps) => {
  return (
    <div
      className={`${sizeMap[size]} border-2 border-slate-200 dark:border-zinc-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin`}
    />
  );
};

export default Spinner;
