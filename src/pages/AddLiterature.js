import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { API } from '../config/api';

import Button from '../components/atoms/Button';
import Alert from '../components/atoms/Alert';
import { Input, InputFile } from '../components/atoms/Form';
import Header from '../components/organism/Header';
import { Modal, ModalTitle, Animate } from '../components/molecules/Modal';

export default function AddLiterature() {
  const ref = useRef();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState({
    thumbnail: '',
    attach: '',
  });
  const [form, setForm] = useState({
    title: '',
    publication_date: '',
    pages: '',
    ISBN: '',
    author: '',
    attach: '',
    thumbnail: '',
  });

  const { title, publication_date, pages, ISBN, author, attach, thumbnail } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.name === 'thumbnail') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview({
        ...preview,
        thumbnail: url,
      });
    }
    if (e.target.name === 'attach') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview({
        ...preview,
        attach: url,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // content type headers
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // store formdata
      const formData = new FormData();
      formData.set('title', title);
      formData.set('publication_date', publication_date);
      formData.set('pages', pages);
      formData.set('ISBN', ISBN);
      formData.set('author', author);
      formData.set('attach', attach[0], attach[0].filename);
      formData.set('thumbnail', thumbnail[0], thumbnail[0].filename);

      // post data to database
      await API.post('/literature', formData, config);

      const alert = (
        <Alert
          variant="green"
          message="Add new literature is successfull"
          onClick={() => {
            setMessage(null);
          }}
        />
      );
      setMessage(alert);

      setTimeout(() => {
        history.push('/profile');
      }, 1700);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <Header />
      {message && message}
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 ">
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">Add Literature</header>
            <form onSubmit={handleSubmit} action="/" method="post" encType="multipart/form-data" className="space-y-4">
              <Input type="text" placeholder="Title" name="title" value={title} onChange={handleChange} />
              <input
                type="text"
                placeholder="Publication Date"
                name="publication_date"
                onChange={handleChange}
                value={publication_date}
                ref={ref}
                onFocus={() => (ref.current.type = 'date')}
                onBlur={() => (ref.current.type = 'date')}
                className={`p-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 placeholder-gray-300`}
              />
              <Input type="number" placeholder="Pages" name="pages" value={pages} onChange={handleChange} />
              <Input type="text" placeholder="ISBN" name="ISBN" value={ISBN} onChange={handleChange} />
              <Input type="text" placeholder="Author" name="author" value={author} onChange={handleChange} />
              <div className="flex gap-6 pb-4">
                <InputFile name="attach" text="Attach Book File" onChange={handleChange} />
                <InputFile name="thumbnail" text="Attach Thumbnail" onChange={handleChange} />
              </div>

              <Button onClick={() => setIsOpen(true)} type="button" text="Add Literature" className="bg-danger text-white float-right px-8 font-bold" />
              <div className="flex gap-4 pb-4">
                {preview.attach !== '' && <iframe title={preview.attach} width="200px" height="288px" src={`${preview.attach}#toolbar=0`} alt={preview.attach} />}
                {preview.thumbnail !== '' && <img className="w-52 h-72" src={preview.thumbnail} alt={preview.thumbnail} />}
              </div>
              <Animate show={isOpen}>
                <Modal>
                  <ModalTitle text={`Confirm`} onClose={() => setIsOpen(false)} />
                  <div className="text-sm text-gray-200 pb-4">
                    <p className="">Title: {title}</p>
                    <p className="">ISBN: {ISBN}</p>
                  </div>
                  <p className="text-gray-200 text-lg text-center font-bold">You will apply this book for verification</p>
                  <div className="flex gap-4 justify-center">
                    <Button onClick={() => setIsOpen(false)} type="button" text="Cancel" className="bg-red-500 text-white w-full mt-6" />
                    <Button type="submit" text="Add Literature" className="bg-green-500 text-white w-full mt-6" />
                  </div>
                  <p className="text-gray-400 text-xs text-center mt-2">Make sure the book meets the verification requirements</p>
                </Modal>
              </Animate>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
