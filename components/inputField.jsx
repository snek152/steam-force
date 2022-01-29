export default function InputField({ labelName, re, name, type, className }) {
  return (
    <>
      <label htmlFor={name} className="sr-only">
        {labelName}
      </label>
      <input
        ref={re}
        id={name}
        name={name}
        type={type}
        required
        className={`${
          className ? className : ""
        } dark:bg-black appearance-none transition-colors duration-[10000000000s] rounded-md relative block w-full px-3 py-2 border border-gray-100 dark:border-other-800 placeholder-gray-500 dark:placeholder-other-400 text-gray-900 dark:text-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow-md dark:shadow-white/10 dark:shadow`}
        placeholder={labelName}
      />
    </>
  )
}
