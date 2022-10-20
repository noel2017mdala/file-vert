import file from "../../images/file.png";
import facebook from "../../images/5296499_fb_facebook_facebook logo_icon.png";
import instagram from "../../images/3225191_app_instagram_logo_media_popular_icon.png";
import whatsapp from "../../images/5296520_bubble_chat_mobile_whatsapp_whatsapp logo_icon.png";
import tiktok from "../../images/317714_video_youtube_icon.png";

const Footer = () => {
  let date = new Date();
  return (
    <footer className="bg-veryDarkBlue">
      <div className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0">
        <div className="flex flex-col items-center justify-between space-y-8 md:flex-col md:space-y-8 md:items-start">
          <div>
            <div className="flex space-x-4">
              <img src={file} alt="file" className="w-8 h-8" />
              <p className="text-2xl text-white hover:text-darkGrayishBlue">
                File-vert
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-8">
            <a href="">
              <img src={facebook} alt="file" className="w-8 h-8" />
            </a>

            <a href="">
              <img src={instagram} alt="file" className="w-8 h-8" />
            </a>

            <a href="">
              <img src={whatsapp} alt="file" className="w-8 h-8" />
            </a>

            <a href="">
              <img src={tiktok} alt="file" className="w-8 h-8" />
            </a>
          </div>

          <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright &copy; {date.getFullYear()}, All Rights Reserved
          </div>
        </div>

        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3  text-white">
            <a href="" className="hover:text-brightRed">
              Home
            </a>
            <a href="" className="hover:text-brightRed">
              Pricing
            </a>
            <a href="" className="hover:text-brightRed">
              Careers
            </a>
            <a href="" className="hover:text-brightRed">
              Contacts us
            </a>
          </div>

          <div className="flex flex-col space-y-3  text-white">
            <a href="" className="hover:text-brightRed">
              About us
            </a>
            <a href="" className="hover:text-brightRed">
              Privacy policy
            </a>
            <a href="" className="hover:text-brightRed">
              Terms of service
            </a>
            {/* <a href="" className="hover:text-brightRed">
              Contacts us
            </a> */}
          </div>

          <div className=" hidden mx-auto my-6 text-center text-white md:block">
            Copyright &copy; {date.getFullYear()}, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
