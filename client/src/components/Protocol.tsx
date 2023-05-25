import React from "react";
import { Protocol } from "../interfaces";
import { formatDate } from "../utils/date";
import apiConnection from "../utils/axios";
import { useNavigate } from "react-router-dom";

interface ProtocolProps {
  protocol: Protocol;
  setProtocols: (protocols: Protocol[]) => void;
}

export const ProtocolComponent: React.FC<ProtocolProps> = ({
  protocol,
  setProtocols,
}) => {
  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = { headers: { Authorization: `Bearer ${token}` } };
  const handleDelete = async () => {
    try {
      await apiConnection.delete(`/protocol/${protocol.id}`, requestConfig);
      const { data } = await apiConnection.get("/protocol", requestConfig);
      setProtocols(data);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/protocol/${protocol.id}`);
  };

  return (
    <section className="flex flex-col w-full">
      <div className="flex w-full items-center justify-around border-2 border-indigo-500 py-4 rounded-sm bg-indigo-200 gap-6 my-2">
        <span>
          <strong>Número:</strong> {protocol.id}
        </span>
        <span>
          <strong>Prazo</strong>:{" "}
          {protocol.deadline === 1
            ? `${protocol.deadline} dia`
            : `${protocol.deadline} dias`}
        </span>
        <span>
          <strong>Registrado em:</strong> {formatDate(protocol.created_at)}
        </span>
        <span>
          <strong>Requerente</strong>: {protocol.person?.name}
        </span>
        <span>
          <strong>CPF</strong>: {protocol.person?.cpf}
        </span>
        <div className="flex justify-center items-center gap-2">
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
