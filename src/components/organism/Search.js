import { Input } from '../atoms/Form';

export default function Search(props) {
  return (
    <>
      <input
        type="text"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        placeholder="Search for literature"
        className={`p-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 placeholder-gray-300 ${props.className}`}
      />
      <button type="submit" className="bg-danger hover:bg-red-800 p-2 rounded-md border border-red-700 transition-all duration-100">
        <img src="/assets/icons/search.svg" alt="search" />
      </button>
    </>
  );
}
