import { useEffect, useState } from 'react';

import Header from '../components/organism/Header';
import { Modal, ModalTitle, Animate } from '../components/molecules/Modal';
import { Table, THeader, TBody, TData2 } from '../components/molecules/Table';
import { API } from '../config/api';
import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState(null);
  const [book, setBook] = useState({
    target: '',
    data: '',
  });
  const [message, setMessage] = useState(null);

  // create function get data api
  const getDataBooks = async () => {
    try {
      const res = await API.get('/literature');
      setBooks(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataBooks();
  }, []);

  function showModal(e) {
    const id = Number(e.target.id);
    const dataBook = books.find((book) => book.id === id);
    setIsOpen(true);
    setBook({
      target: e.target.name,
      data: dataBook,
    });
  }

  // handle action for update data
  const handleApprove = async () => {
    // init id from event click button id
    try {
      const id = Number(book?.data.id);
      // config for api request
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // store data form
      const body = {
        status: 'Approve',
      };

      // update data status api
      await API.patch(`/literature/${id}`, body, config);

      const alert = (
        <Alert
          variant="green"
          message="Verification successfully"
          onClick={() => {
            setMessage(null);
          }}
        />
      );

      setMessage(alert);

      setTimeout(() => {
        setIsOpen(false);
        setMessage(null);
        getDataBooks();
      }, 1700);
    } catch (error) {
      console.log(error);
    }
  };

  // handle cancel
  const handleCancel = async () => {
    // init id from event click button id
    try {
      const id = Number(book?.data.id);
      // config for api request
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // store data form
      const body = {
        status: 'Cancel',
      };

      // update data status api
      await API.patch(`/literature/${id}`, body, config);

      const alert = (
        <Alert
          variant="green"
          message="Verification succesfully"
          onClick={() => {
            setMessage(null);
          }}
        />
      );

      setMessage(alert);

      setTimeout(() => {
        setIsOpen(false);
        setMessage(null);
        getDataBooks();
      }, 1700);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {message && message}
      <Header />
      <main className="pt-24 bg-gray-100 flex justify-center min-h-screen pb-10">
        <div className="container flex flex-col gap-8 px-6 md:px-0 ">
          <header className="text-3xl font-bold">Book Verification</header>
          <Table>
            <THeader col1="No" col2="Users or Author" col3="ISBN" col4="Literature" col5="Status" col6="Action" />
            <TBody>
              {books?.map((book, index) => (
                <TData2
                  //
                  key={book.id}
                  no={index + 1}
                  author={book.author}
                  isbn={book.ISBN}
                  link={book.attach}
                  title={book.title}
                  status={book.status}
                  statusStyle={book.status === 'Approve' ? 'green' : book.status === 'Cancel' ? 'red' : 'yellow'}
                  onCancel={showModal}
                  onApprove={showModal}
                  id={book.id}
                />
              ))}
            </TBody>
          </Table>
        </div>

        <Animate show={isOpen}>
          <Modal>
            <ModalTitle text={`Confirm`} onClose={() => setIsOpen(false)} />
            <div className="text-sm text-gray-200 pb-4">
              <p className="">Title: {book?.data.title}</p>
              <p className="">ISBN: {book?.data.ISBN}</p>
            </div>
            <p className="text-gray-200 text-lg text-center font-bold">You will {book?.target === 'Approve' ? 'approve' : 'decline'} this book for publication</p>
            <div className="flex gap-4 justify-center">
              {book?.target === 'Approve' ? (
                <Button onClick={handleApprove} type="button" text="Approve Publication" className="bg-green-500 text-white w-full mt-6" />
              ) : (
                <Button onClick={handleCancel} type="button" text="Cancel Publication" className="bg-red-500 text-white w-full mt-6" />
              )}
            </div>
            <p className="text-gray-400 text-xs text-center mt-2">Make sure the book meets the verification requirements</p>
          </Modal>
        </Animate>
      </main>
    </div>
  );
}
