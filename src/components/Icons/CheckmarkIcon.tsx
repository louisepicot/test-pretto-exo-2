type CheckmarkIconProps = {
  size?: number;
};

export function CheckmarkIcon({
  size = 12,
}: CheckmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 3L4.5 8.5L2 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
