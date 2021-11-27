function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        className={`p-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 placeholder-gray-300 ${props.className}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onFocus={props.onFocus}
        ref={props.ref}
        required
      />
    </>
  );
}

function Select(props) {
  return (
    <div>
      <label htmlFor={props.labelFor} className="font-bold text-lg">
        {props.labelName}
      </label>
      <select defaultValue={'DEFAULT'} onChange={props.onChange} id={props.id} name={props.name} className={`p-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 ${props.className}`}>
        {props.children}
      </select>
    </div>
  );
}

function Option(props) {
  return (
    <>
      <option onChange={props.onChange} value={props.value} id={props.id} className="bg-primary">
        {props.field}
      </option>
    </>
  );
}

function InputFile(props) {
  return (
    <div>
      <label htmlFor={props.name} className={`p-2 w-max flex items-center gap-4 bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 placeholder-gray-300 cursor-pointer ${props.className}`}>
        {props.text}
        <img className="w-5 h-7" src="/assets/icons/attach.svg" alt="icon" />
      </label>
      <input onChange={props.onChange} type="file" hidden id={props.name} name={props.name} />
    </div>
  );
}

function DirectLink(props) {
  return (
    <p className="text-center text-gray-400 mt-4 text-sm">
      {props.text}
      <button type="button" onClick={props.onClick} className="font-bold text-red-700">
        {props.textLink}
      </button>
    </p>
  );
}

export { Input, DirectLink, Select, Option, InputFile };
