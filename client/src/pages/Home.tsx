import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiConnection from "../utils/axios";
import { Person, Protocol } from "../interfaces";
import Header from "../components/Header";
import { PersonComponent } from "../components/Person";
import { ProtocolComponent } from "../components/Protocol";
import EmptyResult from "../components/EmptyResults";

function Home() {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [searchPlaceholder, setSearchPlaceholder] =
    useState<string>("Pesquisar");

  const [people, setPeople] = useState<Person[]>([]);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [btnEnabled, setBtnEnabled] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  };

  const user = localStorage.getItem("user");
  const token = user ? (JSON.parse(user).token as string) : "";
  const requestConfig = {
    Accept: "application/json",
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleLogout = async () => {
    try {
      await apiConnection.post("/logout", {}, requestConfig);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "") {
      setSearchPlaceholder("Pesquisar");
      setBtnEnabled(false);
    } else if (e.target.value === "person") {
      setSearchPlaceholder("Digite nome ou CPF do requerente");
      setBtnEnabled(true);
    } else if (e.target.value === "protocol") {
      setSearchPlaceholder("Digite número do protocolo ou CPF do requerente");
      setBtnEnabled(true);
    }
  };

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const fetchPeople = async () => {
    try {
      const {
        data: { data },
      } = await apiConnection.get(
        `${selectedOption}/search?search=${searchText}`,
        requestConfig
      );
      setProtocols([]);
      setPeople(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProtocols = async () => {
    try {
      const {
        data: { data },
      } = await apiConnection.get(
        `${selectedOption}/search?search=${searchText}`,
        requestConfig
      );
      setPeople([]);
      setProtocols(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (selectedOption === "person") fetchPeople();
    else if (selectedOption === "protocol") fetchProtocols();
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <section className="flex w-full h-screen flex-col bg-zinc-100">
      <Header
        handleChange={handleChange}
        selectedOption={selectedOption}
        searchText={searchText}
        handleSearchText={handleSearchText}
        searchPlaceholder={searchPlaceholder}
        handleSearch={handleSearch}
        btnEnabled={btnEnabled}
        handleLogout={handleLogout}
      />
      {people.length ? (
        <div className="flex flex-col justify-center m-2">
          <h1 className="text-3xl font-bold mb-2 text-indigo-900">
            Requerentes
          </h1>
          {people.map((person) => (
            <PersonComponent
              key={person.id}
              person={person}
              setPeople={setPeople}
            />
          ))}
        </div>
      ) : null}

      {protocols.length ? (
        <div className="flex flex-col justify-center m-2">
          <h1 className="text-3xl font-bold mb-2 text-indigo-900">
            Protocolos
          </h1>
          {protocols.map((protocol) => (
            <ProtocolComponent
              key={protocol.id}
              protocol={protocol}
              setProtocols={setProtocols}
            />
          ))}
        </div>
      ) : null}
      {!people.length && !protocols.length ? <EmptyResult /> : null}
    </section>
  );
}

export default Home;
