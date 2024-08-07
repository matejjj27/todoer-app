import { useContext, useEffect, useRef, useState } from "react";
import { ComponentWithSideNav, ICategory } from "../../utils/types";
import { TodoContext } from "../../context/TodoProvider";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../../context/UIProvider";
import ConfirmationModal from "../ConfirmationModal";
import { ThreeDots } from "react-loader-spinner";

const SideNav = ({ isSideNavOpened, toggleSideNav }: ComponentWithSideNav) => {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [isNewCategoryClicked, setIsNewCategoryClicked] =
    useState<boolean>(false);
  const [isDeleteCategoryClicked, setIsDeleteCategoryClicked] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const { isDarkMode } = useContext(UIContext);
  const {
    categories,
    currentCategory,
    addNewCategory,
    deleteCategory,
    loadingStates
  } = useContext(TodoContext);
  const { isGetCategoriesLoading } = loadingStates;
  const navigate = useNavigate();

  const upcomingTodos = categories
    ? categories.reduce((accumulator, category) => {
        return (
          accumulator +
            category.subCategories?.reduce((subAccumulator, subCategory) => {
              return (
                subAccumulator +
                subCategory?.todos?.filter((todo) => !todo.isCompleted)?.length
              );
            }, 0) || 0
        );
      }, 0)
    : 0;

  const completedTodos = categories
    ? categories.reduce((accumulator, category) => {
        return (
          accumulator +
            category.subCategories?.reduce((subAccumulator, subCategory) => {
              return (
                subAccumulator +
                subCategory?.todos?.filter((todo) => todo.isCompleted)?.length
              );
            }, 0) || 0
        );
      }, 0)
    : 0;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNewCategoryClicked) {
      inputRef!.current!.focus();
    }
  }, [isNewCategoryClicked]);

  const handleCategoryOpen = (category: ICategory) => {
    navigate(`/categories/${category?.id}`);
    if (toggleSideNav && window.innerWidth <= 750) toggleSideNav();
  };

  const handleCategoryCreate = () => {
    const trimmedCategory = newCategoryName.trim();
    if (trimmedCategory !== "") {
      addNewCategory({
        name: trimmedCategory,
        subCategories: []
      });
    }
    setIsNewCategoryClicked(false);
    setNewCategoryName("");
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef?.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsNewCategoryClicked(false);
      setNewCategoryName("");
    }
  };

  const confirmDelete = async (category: ICategory) => {
    setIsDeleteCategoryClicked(false);
    setIsEditClicked(false);
    await deleteCategory(category?.id || "");
    if (category?.id === currentCategory?.id) {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-350 dark:bg-gray-750">
      <aside
        className={`fixed top-3 left-0 z-40 w-16 h-screen transition-transform -translate-x-full  ${
          isSideNavOpened ? "" : "translate-x-0"
        } `}
      >
        <button
          data-drawer-target="separator-sidebar"
          data-drawer-toggle="separator-sidebar"
          aria-controls="separator-sidebar"
          onClick={toggleSideNav}
          className={`${
            isSideNavOpened ? "hidden" : ""
          }items-center p-2 mx-3 text-sm text-gray-950 sm-hidden rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-650 mt-4`}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </aside>

      <aside
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full ${
          !isSideNavOpened ? "" : "translate-x-0"
        } p-3`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-750 rounded-xl">
          <ul className="space-y-2 mb-3">
            <li className="flex justify-between items-center">
              <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group text-lg">
                Menu
              </p>
              <button
                onClick={toggleSideNav}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-650 group"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
          <p className="flex items-center ml-1 text-sm text-gray-500 rounded-lg dark:text-gray-500">
            TODOER
          </p>
          <ul className="space-y-1 py-2.5 font-medium border-t border-gray-200 dark:border-gray-700">
            <li onClick={() => navigate("/")}>
              <a className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-650 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Home</span>
              </a>
            </li>
            <li>
              <a className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-650 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.1}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">To do</span>
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 ms-3 text-xs font-medium rounded-full text-red-900 dark:text-red-200 bg-red-200 dark:bg-red-900 ">
                  {upcomingTodos}
                </span>
              </a>
            </li>
            <li>
              <a className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-650 group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Completed</span>
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 ms-3 text-xs font-medium rounded-full text-green-900 dark:text-green-100 bg-green-200 dark:bg-green-900 ">
                  {completedTodos}
                </span>
              </a>
            </li>
          </ul>
          <div className="flex justify-between">
            <p className="flex items-center pt-3 ml-1 text-sm text-gray-500 rounded-lg dark:text-gray-500">
              CATEGORIES
            </p>
            {!isEditClicked ? (
              <div
                className="cursor-pointer self-end pb-0 mr-2"
                onClick={() => setIsEditClicked(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  fill="none"
                  className="w-6 h-6"
                >
                  <path
                    d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5"
                    stroke={isDarkMode ? "lightgray" : "black"}
                    strokeWidth={1.3}
                  />
                </svg>
              </div>
            ) : (
              <div
                className="cursor-pointer self-end mr-2"
                onClick={() => setIsEditClicked(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 2 24 24"
                  strokeWidth={1.5}
                  stroke={isDarkMode ? "lightgray" : "black"}
                  className="w-6 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            )}
          </div>
          {isGetCategoriesLoading ? (
            <div className="flex justify-center">
              <ThreeDots
                visible={true}
                height="80"
                width="20"
                color="#969C9C"
                radius="9"
              />
            </div>
          ) : (
            <ul className="space-y-1 py-2.5 font-medium border-t border-gray-200 dark:border-gray-700">
              {categories?.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategoryOpen(category)}
                >
                  <a
                    className={`flex items-center ml-1 p-2 text-gray-900 transition duration-75 rounded-lg ${
                      isEditClicked
                        ? ""
                        : "hover:bg-gray-100 dark:hover:bg-gray-650 cursor-pointer"
                    }  dark:text-white group`}
                  >
                    {isEditClicked ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.4}
                        stroke={isDarkMode ? "white" : "black"}
                        style={{ marginLeft: -4, marginRight: -4 }}
                        className="w-6 h-6 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-650 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDeleteCategoryClicked(true);
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    ) : (
                      <div
                        style={{ backgroundColor: category.color }}
                        className={`rounded-md w-4 h-4`}
                      />
                    )}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      {category.name}
                    </span>
                    {!isEditClicked && (
                      <span
                        className={`inline-flex items-center justify-center px-1.5 py-0.5 ms-3 text-xs font-medium text-gray-800 bg-gray-300 rounded-full dark:bg-gray-600 dark:text-gray-300`}
                      >
                        {categories
                          ? category.subCategories?.reduce(
                              (accumulator, subCategory) => {
                                return accumulator + subCategory?.todos?.length;
                              },
                              0
                            )
                          : []}
                      </span>
                    )}
                  </a>
                  <ConfirmationModal
                    key={category.id}
                    isOpen={isDeleteCategoryClicked}
                    onRequestClose={() => setIsDeleteCategoryClicked(false)}
                    onConfirm={() => confirmDelete(category)}
                    title="Confirm Deletion"
                    message={`Are you sure you want to delete this category (${category.name})?`}
                  />
                </li>
              ))}

              {isNewCategoryClicked ? (
                <li>
                  <a className="flex cursor-pointer items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-650 dark:text-white group">
                    <div className="text-gray-900 dark:text-white ">
                      <input
                        ref={inputRef}
                        name="todo-label"
                        placeholder="Category..."
                        className={`cursor-pointer bg-transparent overflow-hidden outline-none w-32`}
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onBlur={handleCategoryCreate}
                        onKeyDown={handleEnterKey}
                      />
                    </div>
                  </a>
                </li>
              ) : (
                <div
                  className="cursor-pointer w-6 mx-auto rounded-xl p-0.5 hover:bg-gray-100 hover:bg-opacity-20"
                  onClick={() => setIsNewCategoryClicked(true)}
                >
                  <PlusIcon
                    height={20}
                    color={isDarkMode ? "white" : "black"}
                  />
                </div>
              )}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideNav;
