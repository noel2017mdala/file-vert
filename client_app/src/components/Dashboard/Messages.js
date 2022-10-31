import messages from "../../images/message_alert_icon.svg";

const Messages = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center justify-center  h-screen">
        <img src={messages} className="h-2/4 w-2/4" />

        <h3 className="font-bold text-sm md:text-xl text-brightRedLight">
          Oops no messages found
        </h3>
      </div>
    </div>
  );
};

export default Messages;
