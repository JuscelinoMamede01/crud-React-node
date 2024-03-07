import { useEffect, useRef, useState, FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";
import "./App.css";

interface CustomersProps {
  id: string;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

function App() {
  const [customers, setCustomers] = useState<CustomersProps[]>([]);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const response = await api.get("/customers");
    setCustomers(response.data);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) return;

    const response = await api.post("/customer", {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
    });
    setCustomers((allCustomers) => [...allCustomers, response.data]);
    nameRef.current.value = "";
    emailRef.current.value = "";
  }

  async function handleDelete(id: string) {
    try {
      await api.delete("/customer", { params: { id: id } });
    } catch (error) {
      console.log(error);
    }

    const allCustomers = customers.filter((customer) => customer.id !== id);
    setCustomers(allCustomers);
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-950 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl  pb-4">
          <h1 className="text-white text-4xl font-medium text-center">
            Customers
          </h1>

          <form className="max-w-full mx-auto p-10" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="Full name here"
                required
                ref={nameRef}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="email@gmail.com"
                required
                ref={emailRef}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>
          </form>

          <section className=" flex flex-col gap-4">
            {customers.map((customer) => (
              <article
                key={customer.id}
                className="relative border border-sky-500 p-4 rounded hover:scale-105 duration-200"
              >
                <p className="text-sm font-medium text-white">
                  Name:
                  <span> {customer.name}</span>
                </p>
                <p className="text-sm font-medium text-white">
                  Email:
                  <span> {customer.email}</span>
                </p>
                <p className="text-sm font-medium text-white">
                  Status:
                  <span> {customer.status ? "Active" : "Inactive"}</span>
                </p>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500 p-2 rounded flex justify-center items-center absolute right-4 top-7"
                >
                  <FiTrash color="#fff" size={18} />
                </button>
              </article>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
