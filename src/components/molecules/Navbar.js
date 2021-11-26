import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import { NavItem, NavLogo } from '../atoms/NavItems';
import Button from '../atoms/Button';

export default function Navbar(props) {
  return (
    <nav className="container flex flex-row-reverse justify-between items-center px-4 md:px-0">
      <NavLogo to="/" />
      <div className="md:hidden">
        <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-800">
          <span className="sr-only">Open menu</span>
          <MenuIcon className="h-7 w-7" aria-hidden="true" />
        </Popover.Button>
      </div>

      {/* navlink */}
      <Popover.Group as="nav" className="hidden md:flex space-x-10">
        {/* navItems */}
        <NavItem to="/" text="Profile" />
        <NavItem to="/" text="My Collection" />
        <NavItem to="/" text="Add Literature" />
        <Button type="button" text="Logout" className="text-lg text-gray-200 py-0 hover:text-red-700" />
      </Popover.Group>

      {/* panel when small width */}
      <Transition
        //
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-200 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-primary ">
            <div className="pt-4 pb-4 px-5">
              <div className="flex items-center justify-between">
                <NavLogo to="/" />
                <div className="-mr-2">
                  <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none ">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-4 px-5 space-y-6">
              <div className="space-y-2-4 w-full">
                <NavItem to="/" text="Profile" />
                <NavItem to="/" text="My Collection" />
                <NavItem to="/" text="Add Literature" />
              </div>

              <div>
                <Button text="Logout" className="bg-danger w-full text-white" />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </nav>
  );
}
