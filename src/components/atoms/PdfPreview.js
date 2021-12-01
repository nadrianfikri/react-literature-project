const PdfPreview = (props) => {
  return <iframe title={props.file} width="400" height="500px" src={`${props.file}#toolbar=0`} seamless="seamless" frameBorder="0" />;
};

export default PdfPreview;
