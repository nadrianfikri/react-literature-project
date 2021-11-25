export default function Button(props) {
  return (
    <button className={` py-2 px-4 rounded-md ${props.className}`} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
