export default function Alert(props) {
  return (
    <div className={`text-center text-${props.variant}-700 bg-${props.variant}-200 fixed top-16 right-10 w-max min-w-max h-16  flex justify-center items-center gap-6 p-2 text-center  rounded-md z-50`}>
      {props.message}
      <button onClick={props.onClick} className="  text-3xl text-gray-400 close-modal z-50 transform rotate-45">
        +
      </button>
    </div>
  );
}
