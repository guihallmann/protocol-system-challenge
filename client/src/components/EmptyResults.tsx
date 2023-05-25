import { FolderOpenIcon } from "@heroicons/react/24/solid";

function EmptyResult() {
  return (
    <section className="flex h-screen w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-indigo-900">
        Nenhum resultado encontrado...
      </h1>
      <FolderOpenIcon className="h-12 w-12 text-yellow-500" />
    </section>
  );
}

export default EmptyResult;
