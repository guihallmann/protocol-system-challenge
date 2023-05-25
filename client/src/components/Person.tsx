import React from "react";
import { Person } from "../interfaces";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import apiConnection from "../utils/axios";

interface PersonProps {
  person: Person;
  setPeople: (people: Person[]) => void;
}

export const PersonComponent: React.FC<PersonProps> = ({
  person,
  setPeople,
}) => {
  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = { headers: { Authorization: `Bearer ${token}` } };

  const navigate = useNavigate();

  const handleProtocols = () => {
    navigate(`/person/${person.id}/protocols`);
  };

  const handleEdit = () => {
    navigate(`/edit/person/${person.id}`);
  };

  const handleDelete = async () => {
    try {
      await apiConnection.delete(`/person/${person.id}`, requestConfig);
      const { data } = await apiConnection.get("/person", requestConfig);
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex w-full items-center justify-around border-2 border-indigo-500 py-4 rounded-sm bg-indigo-200 gap-6 my-2">
        <span>
          <strong>CPF:</strong> {person.cpf}
        </span>
        <span>
          <strong>Nome</strong>: {person.name}
        </span>
        <span>
          <strong>Nascimento:</strong> {formatDate(person.birthday)}
        </span>
        <span>
          <strong>Sexo</strong>: {person.sex}
        </span>
        <span>
          <strong>Cidade:</strong> {person.city ?? ""}
        </span>
        <span>
          <strong>Bairro:</strong> {person.neighborhood ?? ""}
        </span>
        <span>
          <strong>Rua:</strong> {person.street ?? ""}
        </span>
        <span>
          <strong>Número:</strong> {person.number ?? ""}
        </span>
        <span>
          <strong>Complemento:</strong> {person.complement ?? ""}
        </span>
        <div className="flex justify-between items-center gap-2">
          <button
            className="p-2 rounded-sm bg-emerald-500 font-medium text-white"
            type="button"
            onClick={handleProtocols}
          >
            Protocolos
          </button>
          <button
            className="p-2 rounded-sm bg-yellow-500 font-medium text-white"
            type="button"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="p-2 rounded-sm bg-rose-500 font-medium text-white"
            type="button"
            onClick={handleDelete}
          >
            Excluir
          </button>
        </div>
      </div>
    </section>
  );
};
