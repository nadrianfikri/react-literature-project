const InfoHeader = (props) => {
  return (
    <header className="text-white space-y-2">
      <h1 className="font-hero text-4xl font-bold">{props.title}</h1>
      <p className="text-gray-500 text-xl">{props.author}</p>
    </header>
  );
};

export default InfoHeader;
