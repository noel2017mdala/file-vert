import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import fileUpload from "../../images/172620_upload_icon.png";
import { GET_FORMATS, FETCH_DATA } from "../../Graphql/queries";
import { useGQLQuery } from "../../hooks/useGqlQueries";
import { useAuth } from "../../context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { css } from "@emotion/react";
import { notify } from "../../helper/notification";
import { ToastContainer } from "react-toastify";
const GetStarted = () => {
  const [files, setFiles] = useState();
  const [dropDown, toggleDropdown] = useState(false);
  const [convertTypes, setConvertTypes] = useState([]);

  const [extensionName, setExtensionName] = useState("");
  const [convertName, setConvertName] = useState("Convert to");
  const [loaderState, setLoaderState] = useState(false);
  const [downloadButton, setDownloadButton] = useState(false);
  const [downloadContent, setDownloadContent] = useState();
  const { currentUser, socket } = useAuth();
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

  useEffect(() => {
    socket.on("file-download", (data) => {
      setDownloadButton(true);
      setDownloadContent(data.result);
    });
  }, [socket]);

  const { data, isLoading, error, refetch } = useGQLQuery(
    "get_formats",
    GET_FORMATS,
    { id: currentUser.user.id, format: extensionName },
    {
      enabled: false,
    }
  );

  const uploadFiles = (files) => {
    if (files && convertName !== "Convert to" && convertName !== "") {
      setLoaderState(true);
      const formData = new FormData();
      formData.append("description", "file conversion");
      formData.append("fileFormat", convertName);
      formData.append("file", files);

      axios
        .put(` http://localhost:8000/upload`, formData)
        .then((res) => {
          // console.log(res.data);
          if (res.data.status) {
            notify.successBottom(
              "you file is being converted you will be notified once done "
            );
            setLoaderState(false);
            setFiles(undefined);
          } else {
            notify.fail("failed to convert your file please try again later");
            setLoaderState(false);
            setFiles(undefined);
          }
        })
        .catch((err) => {
          notify.fail("failed to convert your file please try again later");
          setLoaderState(false);
          setFiles(undefined);
        });
    }
  };

  // const {
  //   data: userData,
  //   isLoading: loading,
  //   error: userErr,
  //   refetch: dataRefetch,
  // } = useGQLQuery("fetch_data", FETCH_DATA, {
  //   enabled: false,
  // });

  const {
    data: userData,
    isLoading: loading,
    error: userErr,
    refetch: dataRefetch,
  } = useGQLQuery(
    "fetch_data",
    FETCH_DATA,
    { id: currentUser.user.id },
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

                  <input {...getInputProps()} name="file" />
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
            {downloadButton ? (
              <a
                onClick={() => {
                  setDownloadButton(false);
                  setDownloadContent({});
                  setConvertName("Convert to");
                }}
                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
                href={downloadContent.downloadLink}
              >
                download
              </a>
            ) : (
              <button
                className="p-3 px-6 pt-2 text-white bg-brightRed rounded-full font-bold hover:bg-brightRedLight"
                onClick={() => {
                  // files.map((file) => {
                  //   let text = file.name;
                  //   let newText = text.split(".");
                  //   if (newText) {
                  //     console.log(newText);
                  //   }
                  // });
                  // getFetchedData.refetch()

                  // const getUserFetch = dataRefetch();
                  // console.log(getUserFetch);

                  // console.log(files[0]);
                  if (files) {
                    uploadFiles(files[0]);
                  } else {
                    notify.fail("Please select a file to convert");
                  }
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
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default GetStarted;
