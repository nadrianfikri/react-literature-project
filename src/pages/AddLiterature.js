import { useRef } from 'react';
import Button from '../components/atoms/Button';
import { Input, InputFile } from '../components/atoms/Form';
import Header from '../components/organism/Header';

export default function AddLiterature() {
  const ref = useRef();
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 ">
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">Add Literature</header>
            <div className="space-y-4">
              <Input type="text" placeholder="Title" name="title" value={''} onChange={'handleChange'} />
              <input
                type="text"
                placeholder="Publication Date"
                name="publication_date"
                onChange={'handleChange'}
                ref={ref}
                onFocus={() => (ref.current.type = 'date')}
                onBlur={() => (ref.current.type = 'date')}
                className={`p-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 placeholder-gray-300`}
              />
              <Input type="number" placeholder="Pages" name="pages" value={''} onChange={'handleChange'} />
              <Input type="number" placeholder="ISBN" name="ISBN" value={''} onChange={'handleChange'} />
              <Input type="text" placeholder="Author" name="author" value={''} onChange={'handleChange'} />
              <div className="flex gap-6 pb-4">
                <InputFile name="attach" text="Attach Book File" onChange="handleChange" />
                <InputFile name="thumbnail" text="Attach Thumbnail" onChange="handleChange" />
              </div>

              <Button type="button" text="Add Literature" className="bg-danger text-white float-right px-8 font-bold" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
