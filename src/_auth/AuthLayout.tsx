import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenthicated = false;

  return (
    <>
      {isAuthenthicated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
