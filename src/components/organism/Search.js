import { Input } from '../atoms/Form';

export default function Search(props) {
  return (
    <>
      <Input onChange={props.onChange} name={props.name} value={props.value} type="text" placeholder="Search for literature" />
      <button type="submit" className="bg-danger hover:bg-red-800 p-2 rounded-md border border-red-700 transition-all duration-100">
        <img src="/assets/icons/search.svg" alt="search" />
      </button>
    </>
  );
}
