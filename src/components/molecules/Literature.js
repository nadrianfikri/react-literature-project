import { Link } from 'react-router-dom';

export default function Literature(props) {
  return (
    <div className="relative space-y-2 w-52 ">
      {props.children}
      <Link to={props.to}>
        <img className="rounded-xl w-full h-72 object-cover" src={props.thumbnail} alt="pdf" />
      </Link>
      <Link to={props.to}>
        <p className="text-white font-bold font-hero text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{props.title}</p>
      </Link>
      <div className="flex justify-between text-gray-500 ">
        <p>{props.author}</p>
        <p>{props.year}</p>
      </div>
    </div>
  );
}
