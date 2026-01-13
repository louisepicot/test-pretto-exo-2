type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  "aria-label"?: string;
};

export function LoadingSpinner({
  size = 16,
  className = "",
  "aria-label": ariaLabel = "Loading",
}: LoadingSpinnerProps) {
  return (
    <div className={className} aria-label={ariaLabel}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="8"
          cy="8"
          r="7"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="43.98"
          strokeDashoffset="11"
          strokeLinecap="round"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 8 8;360 8 8"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}
