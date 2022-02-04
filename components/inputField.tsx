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
        } dark:bg-black appearance-none transition-colors duration-[10000000000s] rounded-md relative block w-full px-3 py-2 border border-gray-100 dark:border-other-800 placeholder-gray-500 dark:placeholder-other-400 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-md dark:shadow-white/10 dark:shadow`}
        placeholder={props.labelName}
      />
    </>
  )
}
