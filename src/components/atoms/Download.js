const Download = (props) => {
  return (
    <a className="flex gap-4 p-2 w-max rounded bg-danger text-white" href={props.link} download={props.link} target="_blank" rel="noopener noreferrer">
      Download <img src="/assets/icons/download.svg" alt="download" />
    </a>
  );
};

export default Download;
