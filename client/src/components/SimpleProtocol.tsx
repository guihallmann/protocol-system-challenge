import React from "react";
import { Protocol } from "../interfaces";
import { formatDate } from "../utils/date";

interface ProtocolProps {
  protocol: Protocol;
}

export const SimpleProtocolComponent: React.FC<ProtocolProps> = ({
  protocol,
}) => {
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
        <div className="flex justify-center items-center gap-2">
          <button
            className="p-2 rounded-sm bg-yellow-500 font-medium text-white"
            type="button"
          >
            Editar
          </button>
          <button
            className="p-2 rounded-sm bg-rose-500 font-medium text-white"
            type="button"
          >
            Excluir
          </button>
        </div>
      </div>
    </section>
  );
};
