import { MutableRefObject } from "react"

interface InputFieldProps {
  labelName: string
  re?: MutableRefObject<any>
  name: string
  type: string
  className?: string
}

export default function InputField(props: InputFieldProps) {
  return (
    <>
      <label htmlFor={props.name} className="sr-only">
        {props.labelName}
      </label>
      <input
        ref={props.re || null}
        id={props.name}
        name={props.name}
        type={props.type}
        required
        className={`${
          props.className || ""
        } relative block w-full appearance-none rounded-md border border-gray-100 px-3 py-2 text-gray-900 placeholder-gray-500 shadow-md transition-colors duration-[10000000000s] focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-other-800 dark:bg-black dark:text-gray-50 dark:placeholder-other-400 dark:shadow dark:shadow-white/10 sm:text-sm`}
        placeholder={props.labelName}
      />
    </>
  )
}
