import Literature from '../components/molecules/Literature';
import Header from '../components/organism/Header';

export default function Collection() {
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 pb-20">
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">My Collection</header>
            <div className="flex flex-wrap gap-5 md:gap-20">
              <Literature to="/" thumbnail="/assets/images/pdf.png" title="Judul" author="Nadrian" year="2019" />
              <Literature to="/" thumbnail="/assets/images/pdf.png" title="Judul" author="Nadrian" year="2019" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
