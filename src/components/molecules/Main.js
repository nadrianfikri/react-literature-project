export default function Main(props) {
  return (
    <div className={`bg-primary flex justify-center items-center w-full h-screen`}>
      <main className={`container ${props.className}`}>{props.children}</main>
    </div>
  );
}
