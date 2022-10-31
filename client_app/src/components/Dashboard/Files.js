import files from "../../images/discover_search_files_icon.svg";

const Files = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={files} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight">
          You do not have any files to display
        </h3>
      </div>
    </div>
  );
};

export default Files;
