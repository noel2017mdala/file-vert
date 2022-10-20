const Features = () => {
  return (
    <section id="features">
      <div className="container flex flex-col px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row">
        <div className="flex flex-col space-y-12 md:w-1/2">
          <h2 className="mx-w-md text-4xl font-bold text-center md:text-left">
            What's different about File-vert?
          </h2>
          <p className="max-wid-sm text-center text-darkGrayishBlue md:text-left md:w-3/4">
            File-vert provides all the tools and features you and your team
            need, without much complexity and also without breaking your wallet.
            Our software is easy to use and tailored for everyone.
          </p>
        </div>

        <div className="flex flex-col space-y-8 md:w-1/2">
          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2 ">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                  01
                </div>

                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Convenience
                </h3>
              </div>
            </div>
            <div className="mb-4 text-lg  font-bold">
              <h3 className="hidden font-bold md:mb-4 text-2xl md:block">
                Convenience
              </h3>

              <p className="text-darkGrayishBlue block">
                No software to download. Just select your file, pick a format to
                convert to and away you go
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2 ">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                  02
                </div>

                <h3 className="text-base font-bold md:mb-4 md:hidden">Speed</h3>
              </div>
            </div>
            <div className="mb-4 text-lg  font-bold">
              <h3 className="hidden font-bold md:mb-4 text-2xl md:block">
                Speed
              </h3>

              <p className="text-darkGrayishBlue block">
                We aim to complete all our conversions in under 10 minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row">
            <div className="rounded-l-full bg-brightRedSupLight md:bg-transparent">
              <div className="flex items-center space-x-2 ">
                <div className="px-4 py-2 text-white rounded-full md:py-1 bg-brightRed">
                  03
                </div>

                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Formats
                </h3>
              </div>
            </div>
            <div className="mb-4 text-lg  font-bold">
              <h3 className="hidden font-bold md:mb-4 text-2xl md:block">
                Formats
              </h3>

              <p className="text-darkGrayishBlue block">
                We support 1200+ file formats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
