// import notification from "../../images/profession_entertainment_icon";
import notification from "../../images/profession_entertainment_icon.svg"

const Notification = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={notification} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight">
          Oops no Notifications found
        </h3>
      </div>
    </div>
  );
};

export default Notification;
