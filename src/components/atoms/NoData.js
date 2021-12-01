export default function NoData(props) {
  return (
    <div className="relative w-full flex flex-col items-center text-center text-2xl">
      <p className="absolute top-4  flex flex-wrap w-72 text-white border-b border-gray-200 ">{props.desc}</p>
      <img className="lg:w-1/3 rounded-xl object-cover object-top opacity-70" src="/assets/images/dataNotFound.png" alt="notfound" />
    </div>
  );
}
