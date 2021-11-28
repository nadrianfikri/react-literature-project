const InfoLiterature = (props) => {
  return (
    <article className="text-white space-y-2">
      <h1 className={`text-xl font-bold ${props.textColor}`}>{props.desc}</h1>
      <p className="text-gray-500 text-base">{props.data}</p>
    </article>
  );
};

export default InfoLiterature;
