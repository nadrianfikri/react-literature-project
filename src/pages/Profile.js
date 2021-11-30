import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { API } from '../config/api';
import { AuthContext } from '../context/authContext';
import { TrashIcon } from '@heroicons/react/outline';

import Button from '../components/atoms/Button';
import DataUser from '../components/organism/DataUser';
import Header from '../components/organism/Header';
import Literature from '../components/molecules/Literature';
import { Modal, ModalTitle, Animate } from '../components/molecules/Modal';
import NoData from '../components/atoms/NoData';

export default function Profile() {
  const history = useHistory();
  // init state to save data from api
  const [books, setBooks] = useState([]);
  const [state, dispatch] = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    email: '',
    gender: '',
    phone: '',
    address: '',
    avatar: '',
  });
  const { email, gender, phone, address } = form;
  const id = state.user.id;

  // create function get data api by profile id
  const getDataBooks = async () => {
    try {
      // setForm for update profile
      setPreview(state?.user?.avatar);
      setForm({
        ...form,
        gender: state.user.gender,
        email: state.user.email,
        phone: state.user.phone,
        address: state.user.address,
      });
      const profile_id = state.user.id;

      // get api
      const res = await API.get(`/profile/${profile_id}/literature`);
      const datas = res.data.data;

      const dataBooks = datas.map((data) => {
        data.year = new Date(data.publication_date).getFullYear().toString();
        return data;
      });
      setBooks(dataBooks);
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATE PROFILE DATA
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Create function for handle submit data ...
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // conditional if update profile without new avatar
      if (form.avatar === '') {
        // Configuration
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        // store data form
        const form = {
          email,
          gender,
          phone,
          address,
        };
        // update user data
        await API.patch(`profile/${id}`, form, config);
      } else {
        //  update profile with new avatar

        // Configuration
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };

        // Store data with FormData as object
        const formData = new FormData();
        formData.set('avatar', form.avatar[0]);
        formData.set('email', form.email);
        formData.set('gender', form.gender);
        formData.set('phone', form.phone);
        formData.set('address', form.address);

        // update user data
        await API.patch(`profile/${id}`, formData, config);
      }

      // check user updated
      const response = await API.get('/check-auth');
      if (response.status !== 200) {
        dispatch({
          type: 'AUTH_ERROR',
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: 'AUTH_SUCCESS',
        payload,
      });

      setIsOpen(false);
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div>
      <Header />
      <main className="pt-24 bg-primary flex justify-center min-h-screen ">
        <div className="container flex flex-col gap-10 px-6 md:px-0 pb-20">
          {/* profile */}
          <section className="space-y-6 ">
            <header className="text-3xl text-white font-bold self-start">Profile</header>
            <div className="bg-secondary flex flex-col-reverse md:flex-row justify-between rounded-lg p-8 gap-8 ">
              {/* datauser */}
              <div className="flex flex-col justify-around space-y-4 md:space-y-0">
                <DataUser icon="/assets/icons/email.svg" desc="Email" name={state?.user.email} />
                <DataUser icon="/assets/icons/gender.svg" desc="Gender" name={state?.user.gender} />
                <DataUser icon="/assets/icons/phone.png" desc="Phone" name={state?.user.phone} />
                <DataUser icon="/assets/icons/loc.svg" desc="Address" name={state?.user.address} />
              </div>
              {/* avatar */}
              <div className="flex flex-col gap-2 justify-center items-center">
                <img src={state?.user.avatar} alt="img" className="rounded-md h-52 w-56 object-cover border border-gray-600 " />
                <Button onClick={() => setIsOpen(true)} type="button" text="Edit Profile" className="bg-danger text-white w-56 font-bold" />
              </div>
            </div>
          </section>
          {/* myliteratur */}
          <section className="space-y-6">
            <header className="text-3xl text-white font-bold">My Literature</header>
            <div className="flex flex-wrap gap-5 md:gap-20">
              {books.length > 0 ? (
                <>
                  {books?.map((book) => (
                    <Literature key={book.id} to={`/detail/${book.id}`} thumbnail={book.thumbnail} title={book.title} author={book.author} year={book.year}>
                      {book.status === 'Approve' ? (
                        <></>
                      ) : (
                        <>
                          {book.status === 'Cancel' ? (
                            <button className="absolute -top-2 -right-2 z-30 p-1 rounded-full bg-white border-2 border-red-600">
                              <TrashIcon className="w-8 h-8 text-red-600" />
                            </button>
                          ) : (
                            <></>
                          )}
                          <span></span>
                          <span className="absolute bg-white opacity-50 -top-2 right-0 w-full h-72 z-20 flex justify-center items-center text-center">
                            {book.status === 'Waiting Approve' ? (
                              <p className=" relative z-30 text-yellow-400 bg-black text-3xl font-black">On Verification</p>
                            ) : (
                              <p className=" text-red-500 text-3xl font-black bg-black">Canceled Publish</p>
                            )}
                          </span>
                        </>
                      )}
                    </Literature>
                  ))}
                </>
              ) : (
                <NoData desc="There is no data literatures" />
              )}
            </div>
          </section>
        </div>

        {/* modal edit */}
        <Animate show={isOpen}>
          <Modal>
            <ModalTitle text="Edit Profile" onClose={() => setIsOpen(false)} />
            <section className=" px-2 sm:container mx-auto md:w-max pb-10 ">
              <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-24 bg-primary p-6 rounded-md shadow">
                {/* datauser */}
                <div className="flex flex-col gap-2 text-gray-500">
                  <DataUser icon="/assets/icons/email.svg" desc="Email">
                    <input type="text" className="px-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 " name="email" value={email} onChange={handleChange} />
                  </DataUser>
                  <DataUser icon="/assets/icons/gender.svg" desc="Gender" className="flex-1">
                    <select id="gender" onChange={handleChange} name="gender" className="bg-red-100 px-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 ">
                      <option value={gender} className="bg-primary">
                        {gender}
                      </option>
                      {gender === 'Male' ? (
                        <>
                          <option value="Male" hidden className="bg-primary ">
                            Male
                          </option>
                          <option value="Female" className="bg-primary">
                            Female
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="Male" className="bg-primary ">
                            Male
                          </option>
                          <option hidden value="Female" className="bg-primary">
                            Female
                          </option>
                        </>
                      )}
                    </select>
                  </DataUser>
                  <DataUser icon="/assets/icons/phone.png" desc="Mobile Phone">
                    <input type="text" className="px-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 " name="phone" value={phone} onChange={handleChange} />
                  </DataUser>
                  <DataUser icon="/assets/icons/loc.svg" desc="Address">
                    <input type="text" className="px-2 w-full bg-input text-gray-300 rounded-md focus:outline-none border-2 border-gray-500 " name="address" value={address} onChange={handleChange} />
                  </DataUser>
                </div>
                {/* preview avatar */}
                <div className="flex flex-col gap-2 justify-center items-center">
                  {preview && (
                    <div>
                      <img className="rounded-lg w-40 h-40 object-cover object-center" src={preview} alt="profile" />
                    </div>
                  )}
                  <label className="bg-red-200 text-center text-red-700 rounded-lg px-2 w-full cursor-pointer" htmlFor="files">
                    Change Photo
                  </label>
                  <input type="file" name="avatar" id="files" onChange={handleChange} hidden />
                </div>
              </div>
              <button onClick={handleSubmit} className="flex-none bg-danger hover:bg-red-900 text-white text-lg font-bold py-2 rounded-md w-full">
                Save
              </button>
            </section>
          </Modal>
        </Animate>
      </main>
    </div>
  );
}
