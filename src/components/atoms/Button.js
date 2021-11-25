export default function Button(props) {
  return (
    <button className={` p-2 rounded-md ${props.className}`} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
