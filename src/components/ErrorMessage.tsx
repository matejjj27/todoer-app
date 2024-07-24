const ErrorMessage = () => {
  return (
    <div className="rounded-xl justify-center text-center bg-gray-200 dark:bg-gray-750 p-4 w-80 mt-16">
      <h1 className="text-gray-950 dark:text-white">Oops! Error occurred!</h1>
      <h1 className="text-gray-950 dark:text-white">
        Our Servers are temporarily down.
      </h1>
      <h1 className="text-gray-950 dark:text-white">
        Please be patient while we resolve the issues and try again later.
      </h1>
    </div>
  );
};

export default ErrorMessage;
