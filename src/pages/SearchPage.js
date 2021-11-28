import { useState } from 'react';
import { Option, Select } from '../components/atoms/Form';
import Literature from '../components/molecules/Literature';
import Header from '../components/organism/Header';
import Search from '../components/organism/Search';

export default function SearchPage() {
  const [year, setYear] = useState('');

  const years = ['2020', '2019', '2018', '2017'];
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen">
        <div className="container flex flex-col gap-4 px-6  md:px-0">
          <form action="/literature" className="space-y-8">
            <section className="flex items-center justify-center gap-2 w-full md:w-1/2">
              <Search name="search" value="title" onChange={'onchange'} />
            </section>
            <section className="flex flex-col md:flex-row gap-10 lg:gap-20 ">
              <div className="space-y-2">
                <p className="text-lg text-red-800  ml-2">Anytime</p>
                <Select onChange={'handleChange'} name="year">
                  <option value="DEFAULT" disabled className="bg-primary">
                    Select Year
                  </option>
                  {years.map((year) => (
                    <Option value={year} field={year} />
                  ))}
                </Select>
              </div>
              <div className="flex flex-wrap gap-5 md:gap-20 ">
                <Literature to="/" title="Judul Buku yang sangat panjang" author="Nadrian AA" year="2020" thumbnail="/assets/images/pdf.png" />
                <Literature to="/" title="Judul Buku" author="Nadrian AA" year="2020" thumbnail="/assets/images/pdf.png" />
              </div>
            </section>
          </form>
        </div>
      </main>
    </div>
  );
}
