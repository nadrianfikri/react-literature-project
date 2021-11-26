import { Link } from 'react-router-dom';

export default function Literature(props) {
  return (
    <Link to={props.to} className="space-y-2 w-52  ">
      <img className="rounded-xl h-72 " src={props.thumbnail} alt="pdf" />
      <header className="text-white font-bold font-hero text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{props.title}</header>
      <div className="flex justify-between text-gray-500 ">
        <p>{props.author}</p>
        <p>{props.year}</p>
      </div>
    </Link>
  );
}
