import { SVGProps } from 'react';

export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19.8 11.7a3.4 3.4 0 0 0-3-5.2c-.3-2.4-2.2-4.2-4.6-4.5-2.5-.2-4.9 1.5-5.2 4-2.8.3-5 2.7-5 5.6 0 3.1 2.5 5.6 5.6 5.6h11.4c2.8 0 5-2.2 5-5s-2.2-5-5-5Z" />
      <path d="M12.3 11.2A3.5 3.5 0 0 0 12 5a3.5 3.5 0 0 0-4.3 2.5" />
      <path d="M11 11.3a3.5 3.5 0 0 1 3-3.3" />
      <path d="M14 11.3a3.5 3.5 0 0 1 3-3.3" />
    </svg>
  );
}
