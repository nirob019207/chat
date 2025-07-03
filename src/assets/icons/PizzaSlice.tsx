import type { SVGProps } from "react";

export function PizzaSlice(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" {...props}>
      <path d="M50 10 L90 90 L10 90 Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="40" cy="50" r="5" fill="currentColor" />
      <circle cx="60" cy="70" r="5" fill="currentColor" />
      <circle cx="50" cy="40" r="5" fill="currentColor" />
    </svg>
  );
}
