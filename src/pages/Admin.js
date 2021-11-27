import Header from '../components/organism/Header';
import { Table, THeader, TBody, TData2 } from '../components/molecules/Table';

export default function Admin() {
  function click(e) {
    console.log(e.target.id);
  }
  return (
    <div>
      <Header />
      <main className="pt-24 bg-gray-100 flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-8 px-6 md:px-0 ">
          <header className="text-3xl font-bold">Book Verification</header>
          <Table>
            <THeader col1="No" col2="Users or Author" col3="ISBN" col4="Literature" col5="Status" col6="Action" />
            <TBody>
              <TData2
                //
                key={'1'}
                no={'1'}
                author={'Nama Author'}
                isbn={'12334554'}
                link={'file.pdf'}
                title={'Judul buku ini sangat panjang banget'}
                status={'approve'}
                onCancel={click}
                onApprove={click}
                id={1}
              />
            </TBody>
          </Table>
        </div>
      </main>
    </div>
  );
}
