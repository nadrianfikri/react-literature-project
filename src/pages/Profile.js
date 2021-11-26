import Button from '../components/atoms/Button';
import Literature from '../components/molecules/Literature';
import DataUser from '../components/organism/DataUser';
import Header from '../components/organism/Header';

export default function Profile() {
  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 pb-20">
          {/* profile */}
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">Profile</header>
            <div className="bg-secondary flex flex-col-reverse md:flex-row justify-between rounded-lg p-8 gap-8">
              {/* datauser */}
              <div className="flex flex-col justify-around space-y-4 md:space-y-0">
                <DataUser icon="/assets/icons/email.svg" desc="Email" name="nadrian@gmail.com" />
                <DataUser icon="/assets/icons/gender.svg" desc="Gender" name="Male" />
                <DataUser icon="/assets/icons/phone.png" desc="Phone" name="09826635265" />
                <DataUser icon="/assets/icons/loc.svg" desc="Address" name="Jalan kejalan" />
              </div>
              {/* avatar */}
              <div className="flex flex-col gap-2 justify-center items-center">
                <img src="/assets/images/avatar 1.png" alt="img" className="rounded-md h-52 w-56 object-contain border border-gray-600 " />
                <Button type="button" text="Edit Profile" className="bg-danger text-white w-56 font-bold" />
              </div>
            </div>
          </section>
          {/* myliteratur */}
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">My Literature</header>
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
