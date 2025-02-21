import type { ComponentProps } from "react"

export function FlagPT(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        d="M5 4h8v24H5c-2.208 0-4-1.792-4-4V8c0-2.208 1.792-4 4-4z"
        fill="#2b6519"
      />
      <path
        d="M27 28H12V4h15c2.208 0 4 1.792 4 4v16c0 2.208-1.792 4-4 4z"
        fill="#ea3323"
      />
      <path
        d="M27 4H5a4 4 0 00-4 4v16a4 4 0 004 4h22a4 4 0 004-4V8a4 4 0 00-4-4zm3 20c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3V8c0-1.654 1.346-3 3-3h22c1.654 0 3 1.346 3 3v16z"
        opacity={0.15}
      />
      <path
        d="M27 5H5a3 3 0 00-3 3v1a3 3 0 013-3h22a3 3 0 013 3V8a3 3 0 00-3-3z"
        fill="#fff"
        opacity={0.2}
      />
      <circle cx={12} cy={16} r={5} fill="#ff5" />
      <path
        d="M14.562 13.529l-5.125-.006v3.431a2.53 2.53 0 00.753 1.787 2.55 2.55 0 003.618.009 2.54 2.54 0 00.753-1.808v-3.413z"
        fill="#ea3323"
      />
    </svg>
  )
}