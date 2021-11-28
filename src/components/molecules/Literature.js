import { Link } from 'react-router-dom';

export default function Literature(props) {
  return (
    <div className="space-y-2 w-52 ">
      <Link to={props.to}>
        <img className="rounded-xl h-72 " src={props.thumbnail} alt="pdf" />
      </Link>
      <header className="text-white font-bold font-hero text-xl overflow-hidden overflow-ellipsis whitespace-nowrap">{props.title}</header>
      <div className="flex justify-between text-gray-500 ">
        <p>{props.author}</p>
        <p>{props.year}</p>
      </div>
    </div>
  );
}
