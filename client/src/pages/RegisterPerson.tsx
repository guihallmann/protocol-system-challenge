import { useState, useEffect } from "react";
import apiConnection from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { PersonFormErrors } from "../interfaces";

const emptyForm = {
  name: "",
  birthday: "",
  cpf: "",
  sex: "",
  city: "",
  neighborhood: "",
  street: "",
  number: "",
  complement: "",
};

function RegisterPerson() {
  const navigate = useNavigate();
  const [person, setPerson] = useState(emptyForm);
  const [errors, setErrors] = useState<PersonFormErrors>({});

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  };

  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPerson((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setPerson(emptyForm);
    setErrors({});
  };

  const createPerson = async () => {
    try {
      const { data } = await apiConnection.post(
        "/person",
        person,
        requestConfig
      );
      resetForm();
      alert("Requerente cadastrada com sucesso!");
      navigate("/");
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  };

  useEffect(() => checkUser(), []);

  const inputStyle = "p-2 rounded-sm w-full focus:outline-none mb-2";
  const btnStyle =
    "p-2 rounded-sm bg-emerald-500 font-medium text-white w-full my-1";

  return (
    <section className="flex flex-col w-full justify-center items-center h-screen bg-zinc-100">
      <h1 className="text-3xl mb-2 font-bold text-indigo-900">
        Novo requerente
      </h1>
      <div className="flex flex-col justify-center items-center border-2 border-indigo-500 rounded-sm bg-indigo-200 p-10 w-1/3">
        <label htmlFor="name" className="w-full text-left font-medium">
          Nome*
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Nome"
          name="name"
          id="name"
          value={person.name}
          onChange={handleChange}
        />
        {errors.name ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.name}
          </span>
        ) : null}
        <label htmlFor="birthday" className="w-full text-left font-medium">
          Nascimento*
        </label>
        <input
          className={inputStyle}
          type="date"
          placeholder="Data de Nascimento"
          name="birthday"
          id="birthday"
          value={person.birthday}
          onChange={handleChange}
        />
        {errors.birthday ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.birthday}
          </span>
        ) : null}
        <label htmlFor="cpf" className="w-full text-left font-medium">
          CPF*
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="CPF"
          name="cpf"
          id="cpf"
          value={person.cpf}
          onChange={handleChange}
        />
        {errors.cpf ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.cpf}
          </span>
        ) : null}
        <label htmlFor="sex" className="w-full text-left font-medium">
          Sexo*
        </label>
        <select
          className={inputStyle}
          name="sex"
          id="sex"
          value={person.sex}
          onChange={handleChange}
        >
          <option value="">Sexo</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
        {errors.sex ? (
          <span className="text-sm text-rose-500 font-medium">
            {errors.sex}
          </span>
        ) : null}
        <label htmlFor="city" className="w-full text-left font-medium">
          Cidade
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Cidade"
          name="city"
          id="city"
          value={person.city}
          onChange={handleChange}
        />
        <label htmlFor="neighborhood" className="w-full text-left font-medium">
          Bairro
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Bairro"
          name="neighborhood"
          id="neighborhood"
          value={person.neighborhood}
          onChange={handleChange}
        />
        <label htmlFor="street" className="w-full text-left font-medium">
          Rua
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Rua"
          name="street"
          id="street"
          value={person.street}
          onChange={handleChange}
        />
        <label htmlFor="number" className="w-full text-left font-medium">
          Número
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Número"
          name="number"
          id="number"
          value={person.number}
          onChange={handleChange}
        />
        <label htmlFor="complement" className="w-full text-left font-medium">
          Complemento
        </label>
        <input
          className={inputStyle}
          type="text"
          placeholder="Complemento"
          name="complement"
          id="complement"
          value={person.complement}
          onChange={handleChange}
        />
        <button className={btnStyle} type="button" onClick={createPerson}>
          Registrar
        </button>
      </div>
    </section>
  );
}

export default RegisterPerson;
