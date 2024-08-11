import CustomerDetails from "./components/CustomerDetails";
import CustomersList from "./components/CustomersList";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md border-b z-10">
        <div className="text-center p-3">
          <h1 className="text-2xl font-bold">Customers Portal</h1>
        </div>
      </header>

      <div className="flex flex-1 mt-[60px]">
        <div className=" sm:w-[300px]">
          <CustomersList />
        </div>

        <div className="flex-1">
          <CustomerDetails />
        </div>
      </div>
    </div>
  );
}

export default App;
