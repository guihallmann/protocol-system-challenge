import { useState, useEffect } from "react";
import apiConnection from "../utils/axios";
import Select from "react-select";
import { Person } from "../interfaces";
import { useNavigate, useParams } from "react-router-dom";
import { ProtocolFormErrors } from "../interfaces";

const emptyForm = {
  description: "",
  deadline: "",
  person_id: "",
};

function EditProtocol() {
  const navigate = useNavigate();
  const [protocol, setProtocol] = useState(emptyForm);
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState();
  const [errors, setErrors] = useState<ProtocolFormErrors>({});

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  };

  const { id } = useParams();

  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchPeople = async () => {
    try {
      const { data } = await apiConnection.get("/person", requestConfig);
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProtocol = async () => {
    try {
      const {
        data: { data },
      } = await apiConnection.get(`protocol/${id}`, requestConfig);
      setProtocol(data);
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };

  const handleSelectedPerson = (selectedOption: any) => {
    setSelectedPerson(selectedOption);
    setProtocol((prevState) => ({
      ...prevState,
      person_id: selectedOption.value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProtocol((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setProtocol(emptyForm);
    setErrors({});
  };

  const updateProtocol = async () => {
    try {
      const { data } = await apiConnection.post(
        "/protocol",
        protocol,
        requestConfig
      );
      resetForm();
      alert("Protocolo atualizado com sucesso!");
      navigate("/");
    } catch (error: any) {
      console.log(errors);
      setErrors(error.response.data.errors);
    }
  };

  const personOptions = people.map((person) => ({
    value: person.id,
    label: person.name,
  }));

  useEffect(() => {
    checkUser();
    fetchProtocol();
    fetchPeople();
  }, []);

  useEffect(() => {
    if (protocol && people) {
      const foundPerson = people.find(
        (person) => person.id === protocol.person_id
      );
      setSelectedPerson({ value: foundPerson?.id, label: foundPerson?.name });
    }
  }, [protocol.person_id, people]);

  const inputStyle = "p-2 rounded-sm w-full focus:outline-none mb-2";
  const btnStyle =
    "p-2 rounded-sm bg-emerald-500 font-medium text-white w-full my-1";

  return (
    <section className="flex flex-col w-full justify-center items-center h-screen bg-zinc-100">
      <h1 className="text-3xl mb-2 font-bold text-indigo-900">
        Novo protocolo
      </h1>
      <div className="flex flex-col justify-center items-center border-2 border-indigo-500 rounded-sm bg-indigo-200 p-10 w-1/3">
        <label htmlFor="description" className="w-full text-left font-medium">
          Descrição*
        </label>
        <textarea
          className={inputStyle}
          placeholder="Descrição"
          name="description"
          id="description"
          value={protocol.description}
          onChange={handleChange}
        />
        {errors.description ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.description}
          </span>
        ) : null}
        <label htmlFor="deadline" className="w-full text-left font-medium">
          Prazo*
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Prazo"
          name="deadline"
          id="deadline"
          value={protocol.deadline}
          onChange={handleChange}
        />
        {errors.deadline ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.deadline}
          </span>
        ) : null}
        <label htmlFor="person" className="w-full text-left font-medium">
          Pessoa*
        </label>
        <Select
          className="w-full mb-2"
          options={personOptions}
          value={selectedPerson}
          onChange={handleSelectedPerson}
        />
        {errors.person_id ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.person_id}
          </span>
        ) : null}
        <button className={btnStyle} type="button" onClick={updateProtocol}>
          Registrar
        </button>
      </div>
    </section>
  );
}

export default EditProtocol;
