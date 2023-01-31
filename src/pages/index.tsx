export default function Home() {
  const dataFetching = async () => {
    await fetch("http://localhost:3000/api/test");
  };
  return (
    <div className=" bg-white w-full h-full space-y-2">
      <div className=" bg-gray-200 w-full h-32 flex justify-center items-center">
        <span className="text-3xl">HOME</span>
      </div>
      <div className="w-full flex h-10 justify-center">
        <button
          className="p-5 border-2 hover:bg-purple-100 rounded-md flex items-center justify-center"
          onClick={() => dataFetching()}
        >
          CLICK
        </button>
      </div>
    </div>
  );
}
