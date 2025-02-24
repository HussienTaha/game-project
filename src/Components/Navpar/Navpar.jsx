import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext/UserContext';

export default function Navpar() {
  const { setToken, isLogin } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pages, setpages] = useState([
    { Text: "mmorpg", path: "/" },
    { Text: "Pixel", path: "/pixel" },
    { Text: "shooter", path: "/shooter" },
    { Text: "superhero", path: "/superhero" },
    { Text: "sailig", path: "/sailig" },
    { Text: "permadeath", path: "/permadeath" }
  ]);

  const [authpage, setauthpage] = useState([
    { Text: "login", path: "/login" },
    { Text: "register", path: "/register" },
  ]);

  const navigate = useNavigate();
  const location = useLocation(); 

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

 
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="lg:max-w-screen-xl  max-w-xs me-auto lg:mx-auto fixed right-0 top-2 left-0 w-full z-50  lg:bg-[#041D29] border-gray-200 rounded-2xl dark:bg-gray-900 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:flex lg:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border lg:bg-transparent bg-gray-50 border-gray-100 rounded-lg  lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0   dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            { isLogin && pages.map((page, index) => (
              <li key={index}>
                <NavLink
                  to={page.path}
                  className="block py-2 px-3 lg:text-white text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#FD9900] duration-150 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  {page.Text}
                </NavLink>
              </li>
            ))}

            
            {isAuthPage && !isLogin && (
              <>
                {authpage.map((page, index) => (
                  <li key={index}>
                    <NavLink
                      to={page.path}
                      className="block py-2 px-3 lg:text-white rounded lg:translate-x-[22rem] xl:translate-x-[28rem] 2xl:translate-x-[32rem] hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#FD9900] duration-150 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {page.Text}
                    </NavLink>
                  </li>
                ))}
              </>
            )}

     
            {isLogin && (
             <ul className=' lg:translate-x-40 xl:translate-x-56 2xl:translate-x-72 '>
               <li >
                <button
                  onClick={logOut}
                  className=" py-2 px-3  lg:text-white  ms-auto rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-[#FD9900] duration-150 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  Logout
                </button>
              </li>
             </ul>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}