import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "../../images/172620_upload_icon.png";
import { GET_FORMATS } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { useAuth } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
const GetStarted = () => {
  const [files, setFiles] = useState();
  const [dropDown, toggleDropdown] = useState(false);
  const [convertTypes, setConvertTypes] = useState([]);

  const [extensionName, setExtensionName] = useState("");
  const [convertName, setConvertName] = useState("Convert to");
  const [loaderState, setLoaderState] = useState(false);
  // const [getRootProps, getInputProps] = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       )
  //     );
  //   },
  // });

  const { currentUser } = useAuth();
  const { data, isLoading, error, refetch } = useGQLQuery(
    "get_formats",
    GET_FORMATS,
    { id: currentUser.user.id, format: extensionName },
    {
      enabled: false,
    }
  );

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoaderState(true);
    let newText = acceptedFiles[0].name;
    let fileFormat = newText.slice(
      (Math.max(0, newText.lastIndexOf(".")) || Infinity) + 1
    );
    if (fileFormat) {
      setExtensionName(fileFormat);
      setTimeout(async () => {
        let fileExt = await refetch();
        if (fileExt.data.getFormats.response.status) {
          setConvertTypes(fileExt.data.getFormats.format);
          setFiles(acceptedFiles);
        } else {
          setFiles(undefined);
        }
        setLoaderState(false);
      }, 1000);
    } else {
      setLoaderState(false);
    }

    // Do something with the files
  }, []);

  const override = css`
    display: block;
    border-color: #00bfa5;
  `;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <section className="">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-full  md:w-6/12 rounded-sm shadow-lg uploadContainer flex flex-col justify-center">
          <div className="text-center text-2xl">File Upload</div>
          <div
            className=" flex flex-col items-center justify-center uploadContent "
            {...getRootProps()}
          >
            <div
              className={`border-dashed border-2 border-brightRedLight w-9/12 h-9/12 flex flex-col items-center justify-center space-y-8 ${
                isDragActive ? "bg-brightRedSupLight" : ""
              }`}
            >
              <div className="w-9/12 h-9/12">
                <div className="flex flex-col items-center justify-center space-y-4 my-8">
                  <img src={fileUpload} className="w-1/5 h-1/5" />

                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <button> Drag and drop to upload or choose</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col items-center justify-center ${
              files !== undefined ? "space-y-24" : "space-y-8"
            }`}
          >
            {/* <p>Remaining files this month</p> */}

            {files !== undefined ? (
              <div className="w-2/4 h-12 flex flex-col  items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0">
                <div className="w-6/12">
                  <p className="text-sm tracking-wide truncate">
                    {files.map((file) => file.name)}
                  </p>
                </div>
                <div>
                  <button
                    className="text-white bg-brightRed hover:bg-brightRedLight  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                    type="button"
                    onClick={() => {
                      toggleDropdown(!dropDown);
                    }}
                  >
                    {convertName}
                    <svg
                      className="ml-2 w-4 h-4"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {dropDown ? (
                    <div className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute">
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        {convertTypes.map((types, i) => {
                          return (
                            <li
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              key={i}
                              onClick={(e) => {
                                let convertType = convertTypes[i];

                                setConvertName(convertType);
                                toggleDropdown(!dropDown);
                              }}
                            >
                              {types}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
            <button
              className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
              onClick={() => {
                files.map((file) => {
                  let text = file.name;
                  let newText = text.split(".");
                  if (newText) {
                    console.log(newText);
                  }
                });
              }}
            >
              {loaderState ? (
                <ClipLoader
                  color="#FFFFFF"
                  css={override}
                  size={15}
                  className=""
                />
              ) : (
                "Convert"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
