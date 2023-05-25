import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiConnection from "../utils/axios";
import { Person, Protocol } from "../interfaces";
import { SimpleProtocolComponent } from "../components/SimpleProtocol";
import EmptyResult from "../components/EmptyResults";

function PersonProtocols() {
  const navigate = useNavigate();
  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  };
  const [person, setPerson] = useState<Person>();
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = { headers: { Authorization: `Bearer ${token}` } };

  const { id } = useParams();

  const fetchPersonProtocols = async () => {
    try {
      const {
        data: { data },
      } = await apiConnection.get(`person/${id}/protocols`, requestConfig);
      setProtocols(data.protocols);
      setPerson(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
    fetchPersonProtocols();
  }, []);
  return (
    <section className="flex flex-col w-full h-screen bg-zinc-100">
      {protocols.length ? (
        <div className="flex flex-col justify-center m-2">
          <h1 className="text-3xl font-bold mb-2 text-indigo-900">
            Protocolos de {person?.name}
          </h1>
          {protocols.map((protocol) => (
            <SimpleProtocolComponent key={protocol.id} protocol={protocol} />
          ))}
        </div>
      ) : (
        <EmptyResult />
      )}
    </section>
  );
}

export default PersonProtocols;
