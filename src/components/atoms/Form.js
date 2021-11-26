function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        className={`p-2 w-full bg-input text-white rounded-md focus:outline-none border-2 border-gray-500 ${props.className}`}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        required
      />
    </>
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

export { Input, DirectLink };
