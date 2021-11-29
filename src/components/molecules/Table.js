import { XCircleIcon, CheckCircleIcon } from '@heroicons/react/solid';

function Table2({ children }) {
  return <table className="table-auto text-left overflow-auto bg-white">{children}</table>;
}
function Table({ children }) {
  return <table className="bg-white text-left table-fixed w-800 md:w-auto overflow-auto">{children}</table>;
}
function TFoot(props) {
  return (
    <tfoot className="font-bold text-xs md:text-lg">
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className="py-2">Total</td>
        <td className="py-2">:</td>
        <td className="text-red-600 py-2">{props.total}</td>
      </tr>
    </tfoot>
  );
}
function TData2(props) {
  return (
    <tr className="border-b border-grey-600  overflow-hidden text-sm">
      <td className="px-2">{props.no}</td>
      <td>{props.author}</td>
      <td>{props.isbn}</td>
      <td>
        <a className="text-blue-600" href={props.link} target="_blank" rel="noreferrer">
          <p>{props.title}.pdf</p>
        </a>
      </td>
      <td className={`font-bold text-${props.statusStyle}-500 py-4`}>{props.status}</td>
      <td>
        <div className="flex gap-4 w-full ">
          {props.status === 'Waiting Approve' ? (
            <>
              <button id={props.id} onClick={props.onCancel} type="button" name="Cancel" className="bg-red-500 rounded-md p-1 w-full md:w-28">
                Cancel
              </button>
              <button id={props.id} onClick={props.onApprove} type="button" name="Approve" className="bg-green-500 rounded-md p-1 w-full md:w-28">
                Approve
              </button>
            </>
          ) : (
            <>{props.status === 'Approve' ? <CheckCircleIcon id={props.id} className="h-8 w-8  text-green-400" /> : <XCircleIcon id={props.id} className="h-8 w-8  text-red-400" />}</>
          )}
        </div>
      </td>
    </tr>
  );
}

function TData(props) {
  return (
    <tr className="border-b border-grey-600 text-gray-400 text-xs md:text-lg">
      <td>{props.no}</td>
      <td>{props.fullName}</td>
      <td>{props.email}</td>
      <td>{props.phone}</td>
      <td className="text-black font-bold py-2">Qty</td>
      <td className="text-black font-bold py-2">:</td>
      <td className="text-black font-bold py-2">{props.qty}</td>
    </tr>
  );
}
function TBody({ children }) {
  return <tbody>{children}</tbody>;
}

function THeader(props) {
  return (
    <thead className="border-b border-grey-600 text-xs md:text-base">
      <tr>
        <th className="py-2 px-2">{props.col1}</th>
        <th>{props.col2}</th>
        <th>{props.col3}</th>
        <th>{props.col4}</th>
        <th className="">{props.col5}</th>
        <th className="md:w-60">{props.col6}</th>
        <th>{props.col7}</th>
      </tr>
    </thead>
  );
}
export { Table, Table2, THeader, TBody, TData, TData2, TFoot };
