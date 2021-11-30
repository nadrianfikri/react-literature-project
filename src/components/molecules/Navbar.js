import { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Popover, Transition, Menu } from '@headlessui/react';
import { MenuIcon, XIcon, BellIcon } from '@heroicons/react/outline';
import { AuthContext } from '../../context/authContext';
import { API } from '../../config/api';

import Button from '../atoms/Button';
import { NavItem, NavLogo } from '../atoms/NavItems';
import { LogoutMsg } from '../atoms/Message';

export default function Navbar() {
  const history = useHistory();
  const [state, dispatch] = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [books, setBooks] = useState([]);

  const handleLogout = (e) => {
    setMessage(LogoutMsg);

    setTimeout(() => {
      dispatch({
        type: 'LOGOUT',
      });

      setMessage(null);
      history.push('/');
    }, 1700);
  };

  // get data books from API
  const getData = async () => {
    try {
      const response = await API.get('/literature');
      const datas = response.data.data;
      const filteredData = datas.map((item) => {
        item.updatedAt = new Date(item.updatedAt).toLocaleString('en-GB');
        return item;
      });

      setBooks(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    const ac = new AbortController();
    return () => ac.abort();
  }, [state]);

  const notification = books.filter((item) => item.status === 'Waiting Approve');
  console.log(books);

  return (
    <nav className="container flex flex-row justify-between items-center px-4 md:px-0">
      {message && message}

      {!state.isLogin ? (
        <NavLogo to="/" />
      ) : (
        <>
          {state.user.role === 'user' ? (
            <>
              {/* hamburger */}
              <div className="md:hidden">
                <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-800">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-7 w-7" aria-hidden="true" />
                </Popover.Button>
              </div>

              {/* navlink */}
              <Popover.Group as="nav" className="hidden md:flex space-x-10">
                {/* navItems */}
                <NavItem to="/profile" text="Profile" />
                <NavItem to="/collection" text="My Collection" />
                <NavItem to="/add-literature" text="Add Literature" />
                <Button onClick={handleLogout} type="button" text="Logout" className="text-lg text-gray-200 py-0 hover:text-red-600" />
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
                        <NavItem to="/profile" text="Profile" />
                        <NavItem to="/collection" text="My Collection" />
                        <NavItem to="/add-literature" text="Add Literature" />
                      </div>

                      <div>
                        <Button onClick={handleLogout} text="Logout" className="bg-danger w-full text-white" />
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>

              <NavLogo to="/" />
            </>
          ) : (
            <>
              <NavLogo to="/" />
              <div className="flex justify-center items-center gap-6">
                {/* dropdown notification */}
                <Menu as="div" className="relative inline-block text-left ">
                  <Menu.Button className="relative p-1 rounded-full text-white hover:text-red-600 ">
                    <Transition
                      //
                      as={Fragment}
                      enter="transition duration-400"
                      enterFrom="transform opacity-0 -translate-y-10"
                      enterTo="transform opacity-100 translate-y-0"
                      leaveFrom="transform opacity-100 "
                      leaveTo="transform opacity-0 "
                    >
                      <Menu.Items>
                        <span className={`absolute top-10 right-1 bg-white w-8 h-8 transform rotate-45`}></span>
                      </Menu.Items>
                    </Transition>

                    {notification.length > 0 ? (
                      <>
                        <span className="absolute top-0 right-1 rounded-full w-2 h-2 bg-green-400 animate-ping"></span>
                        <span className="absolute top-0 right-1 rounded-full w-2 h-2 bg-green-400"></span>
                        <BellIcon className="h-7 w-7" aria-hidden="true" />
                      </>
                    ) : (
                      <BellIcon className="h-7 w-7" aria-hidden="true" />
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 -translate-y-10"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-10"
                  >
                    <Menu.Items className="absolute overflow-auto -right-1 mt-2 w-80 max-h-72 origin-top-right bg-white divide-y  rounded-md shadow-lg text-gray-700 ">
                      {books?.map((item) => (
                        <div className="rounded-lg">
                          <Menu.Item>
                            <Link to="/admin" className="py-2 px-4 flex gap-2 hover:bg-gray-300 transition-all duration-300">
                              <img className="w-8 h-8 object-cover object-center rounded-full" src={item?.profile?.avatar} alt="avatar" />
                              <div className="overflow-hidden">
                                <h1 className="font-bold line-clamp-1">The Book {item.status}</h1>
                                <p className="text-xs text-green-600">{item.updatedAt}</p>
                                <p className="text-xs text-gray-400 line-clamp-2 ">
                                  {item?.profile?.fullname} - {item.title}
                                </p>
                              </div>
                            </Link>
                          </Menu.Item>
                        </div>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* avatar */}
                <Menu as="div" className="relative inline-block pt-1 text-left ">
                  <Menu.Button className="">
                    <img className="w-50 h-50 object-cover rounded-full border-2 border-gray-400" src={state?.user.avatar} alt="avatar" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 -translate-y-10"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 -translate-y-10"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56  origin-top-right bg-white divide-y  rounded-md shadow-lg text-gray-700 ">
                      <span className="absolute -top-2 right-2 bg-white w-8 h-8 transform rotate-45"></span>

                      <>
                        <Menu.Item>
                          <Link to="/admin" className="relative flex py-4 pl-9 w-full gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                            <img className="w-10" src="/assets/icons/support 1.svg" alt="" />
                            <p className="text-lg font-bold">Admin</p>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button onClick={handleLogout} type="button" className="relative flex py-4 pl-9 w-full gap-3 items-center hover:bg-gray-100 transition-all duration-300 rounded-lg ">
                            <img src="/assets/icons/logout.svg" alt="" />
                            <p className="text-lg font-bold">Logout</p>
                          </button>
                        </Menu.Item>
                      </>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </>
          )}
        </>
      )}
    </nav>
  );
}
