import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../css/ImagePreview.css";
const ImagePreview = ({
  images,
  setPreview,
  preview,
  previewPicturesIndex,
}: {
  images: string[];
  setPreview: any;
  preview: boolean;
  previewPicturesIndex: number;
}) => {
  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Escape") {
      setPreview(!preview);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const [index, setIndex] = useState(previewPicturesIndex);
  return (
    <div className="bg-gray-800 absolute w-[100vw] h-[100vh] flex-col flex justify-center items-center top-0 left-0">
      <img
        style={{ maxHeight: "600px", minHeight: "300px", maxWidth: "600px" }}
        src={images[index]}
        alt=""
      />
      <div className="mt-3 flex">
        {images.map((item, index) => (
          <img
            key={index}
            className="mx-1 images"
            onClick={() => setIndex(index)}
            style={{ height: "50px", cursor: "pointer" }}
            src={images[index]}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setPreview(!preview);
        }}
        className="absolute p-3 px-4 top-0 right-0 bg-blue-400"
      >
        <FontAwesomeIcon
          //@ts-ignore

          icon={faX}
        ></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default ImagePreview;
