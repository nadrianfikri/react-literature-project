import Button from '../atoms/Button';
import Main from '../molecules/Main';

export default function Hero(props) {
  return (
    <Main className="flex flex-col-reverse lg:flex-row justify-between items-center flex-wrap gap-4">
      <div className="text-white w-96 lg:w-500 text-center md:text-left space-y-6">
        <p style={{ lineHeight: 1 }} className="text-4xl lg:text-6xl font-hero ">
          source <span className="italic">of </span>
          intelligence
        </p>
        <p className="text-md lg:text-2xl ">Sign-up and receive unlimited accesss to all of your literatur - share your literature.</p>
        <div className="flex justify-between gap-4">
          <Button text="Sign Up" className="bg-danger w-full" />
          <Button text="Sign In" className="bg-white w-full text-black" />
        </div>
      </div>
      <img className="w-72 h-72 lg:w-96 lg:h-96 xl:w-620 xl:h-620" src="/assets/images/hero.png" alt="hero" />
    </Main>
  );
}
