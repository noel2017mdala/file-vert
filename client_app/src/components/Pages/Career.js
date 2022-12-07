import career from "../../images/8219582_web_development_maintenance_construction_teamwork_icon.svg";

const Career = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={career} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight mt-12">
          We do not have any open positions at the moment
        </h3>
      </div>
    </div>
  );
};

export default Career;
