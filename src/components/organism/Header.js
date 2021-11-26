import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Navbar from '../molecules/Navbar';

export default function Header(props) {
  return (
    <Popover className="w-full fixed top-0 bg-primary flex justify-center items-center">
      <Navbar />
    </Popover>
  );
}
