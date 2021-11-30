const LoginMsg = () => {
  return <img className="rounded-xl z-50 absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-72 h-72" src="/assets/icons/login-success.gif" alt="success" />;
};

const LogoutMsg = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-primary w-96 h-96  rounded-xl  z-50 absolute top-1/2 right-1/2 transform translate-x-1/2 translate-y-1/4">
      <img className="rounded-full" src="/assets/icons/login-green.gif" alt="success" />
      <p className="text-3xl text-center text-white mt-4">LOGOUT SUCCESS</p>
    </div>
  );
};

export { LoginMsg, LogoutMsg };
