import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import logoUser from "./assets/usericon.jpg";

function Profile() {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((res) => {
        console.log(res.data);
        setBalance(res.data.user.balance);
        setName(res.data.user.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const handleTopUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:5000/topup/${user.id}`,
  //       { amount: topUpAmount }
  //     );
  //     console.log("Top-up response:", response.data);
  //     setBalance(response.data.newBalance);
  //     setTopUpAmount("");
  //   } catch (error) {
  //     console.error("Top-up error:", error);
  //     setError(error.message);
  //   }
  // };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ShoeSQL
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/landing"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Main Menu
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/landing"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Inventory
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sell
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center min-h-screen from-gray-700 via-gray-800 to-gray-900 bg-gradient-to-br">
        <div className="relative w-full group max-w-md min-w-0 mx-auto mt-6 mb-6 break-words bg-white border shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:max-w-sm rounded-xl">
          <div className="pb-6">
            <div className="flex flex-wrap justify-center">
              <div className="flex justify-center w-full">
                <div className="relative">
                  <img
                    src={logoUser}
                    className="dark:shadow-xl border-white dark:border-gray-800 rounded-full align-middle border-8 absolute -m-16 -ml-18 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
            </div>
            <div className="mt-20">
              <h3 className="mb-1 text-2xl font-bold leading-normal text-gray-700 dark:text-gray-300">
                User Profile
              </h3>
              <div className="font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                {name}
              </div>
              <div className="font-bold tracking-wide text-gray-600 dark:text-gray-300 font-mono text-xl">
                IDR {balance}
              </div>
              <input className=" font-bold tracking-wide text-black font-mono text-xl m-3 rounded-sm"></input>
              <button className="w-20 p-1 bg-gray-600 dark:text-gray-300 font-bold tracking-wide font-mono text-xl m-3 rounded-sm">
                Top Up
              </button>
            </div>
            <div className="pt-6 mx-6 mt-6 text-center border-t border-gray-200 dark:border-gray-700/50">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-6">
                  <p className="mb-4 font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    Welcome to User Profile
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-6 overflow-hidden translate-y-6 rounded-b-xl">
              <div className="absolute flex -space-x-12 rounded-b-2xl">
                <div className="w-36 h-8 transition-colors duration-200 delay-75 transform skew-x-[35deg] bg-amber-400/90 group-hover:bg-amber-600/90 z-10"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-100 transform skew-x-[35deg] bg-amber-300/90 group-hover:bg-amber-500/90 z-20"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-150 transform skew-x-[35deg] bg-amber-200/90 group-hover:bg-amber-400/90 z-30"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-200 transform skew-x-[35deg] bg-amber-100/90 group-hover:bg-amber-300/90 z-40"></div>
                <div className="w-28 h-8 transition-colors duration-200 delay-300 transform skew-x-[35deg] bg-amber-50/90 group-hover:bg-amber-200/90 z-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
