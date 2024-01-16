"use client";
import React, { useEffect, useState } from "react";
import { BACKEND_SERVER_IP } from "../layout";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import ImagePreview from "../components/ImagePreview";
import Link from "next/link";
import EditDesc from "../components/EditDesc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import EditJobType from "../components/EditJobType";
import { post } from "../types";
import AuthButtons from "./AuthButtons";
import EditWageType from "../components/EditWageType";
import EditLocation from "../components/EditLocation";
import EditTitle from "../components/EditTitle";
import Page404 from "../components/Page404";

const Post = () => {
  const [preview, setPreview] = useState(false);
  const [previewPictures, setPreviewPictures] = useState<string[]>();
  const [previewPicturesIndex, setPreviewPicturesIndex] = useState(0);
  const [titleEditShow, setTitleEditShow] = useState(false);
  const [editLocationShow, setEditLocationShow] = useState(false);
  const [wageEditShow, setWageEditShow] = useState(false);
  const [descEditShow, setDescEditShow] = useState(false);
  const [typeEditShow, setTypeEditShow] = useState(false);

  useEffect(() => {
    getPost();
  }, []);
  const [post, setPost] = useState<post>();
  const searchParams = useSearchParams();
  const user = useSelector((shop: any) => shop.app.user);

  const getPost = async () => {
    const res = await fetch(`${BACKEND_SERVER_IP}/post/getPost`, {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({
        _id: searchParams.get("id"),
      }),
    });
    const { post } = await res.json();
    setPost(post);
    setPreviewPictures(post.pictures);
  };
  return (
    <div className="flex text-center justify-center">
      {post ? (
        <div className=" p-3 w-[50vw] flex flex-col m-5">
          <div className="flex justify-center items-center">
            {!titleEditShow ? (
              <h3 className="text-3xl my-5 font-semibold">{post.title}</h3>
            ) : (
              <EditTitle
                show={titleEditShow}
                id={post._id}
                setShow={setTitleEditShow}
              />
            )}
            {post.user == user.userId && !titleEditShow && (
              <button
                onClick={() => setTitleEditShow(!titleEditShow)}
                className="ms-2 flex justify-center items-center w-6 h-6 text-white p-1 rounded-full bg-green-700"
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}
          </div>
          <span className="text-xl flex justify-center">
            {!typeEditShow ? (
              <span>
                <span className="font-semibold">Type:</span>{" "}
                {post.type.cleaning && "Cleaning"}
                {post.type.cuttingGrass && "Cutting Grass"}
                {post.type.movingHeavyObjects && "Moving Heavy Objects"}
                {post.type.plumbering && "Plumbering"}
                {post.type.walkingTheDog && "Walking The Dog"}
              </span>
            ) : (
              <EditJobType
                show={typeEditShow}
                id={post._id}
                setShow={setTypeEditShow}
                type={post.type}
              />
            )}
            {post.user == user.userId && !typeEditShow && (
              <button
                onClick={() => setTypeEditShow(!typeEditShow)}
                className="ms-2 flex justify-center items-center w-6 h-6 text-white p-1 rounded-full bg-green-700"
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}
          </span>
          <span className="text-xl flex justify-center">
            {!wageEditShow ? (
              <span className="">
                {post.price != -1 ? (
                  <>
                    <span className="font-semibold">Price:</span>
                    {post.price}
                  </>
                ) : (
                  <>
                    <span className="font-semibold">Hourly: </span>
                    {post.hourly}
                  </>
                )}
                $
              </span>
            ) : (
              <EditWageType
                show={wageEditShow}
                id={post._id}
                setShow={setWageEditShow}
              />
            )}

            {post.user == user.userId && !wageEditShow && (
              <button
                onClick={() => setWageEditShow(!wageEditShow)}
                className="ms-2 flex justify-center items-center w-6 h-6 text-white p-1 rounded-full bg-green-700"
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}
          </span>
          <span className="text-xl flex justify-center">
            {!editLocationShow ? (
              <span>
                <span className="font-semibold">Location: </span>
                {post.location.state + "/" + post.location.city}
              </span>
            ) : (
              <EditLocation
                show={editLocationShow}
                id={post._id}
                setShow={setEditLocationShow}
                location={post.location}
              />
            )}
            {post.user == user.userId && !editLocationShow && (
              <button
                onClick={() => setEditLocationShow(!editLocationShow)}
                className="ms-2 flex justify-center items-center w-6 h-6 text-white p-1 rounded-full bg-green-700"
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}
          </span>

          <div className="flex flex-col justify-center">
            <h2 className="text-xl">Description:</h2>
            <span className="text-sm">
              {descEditShow ? (
                <EditDesc
                  show={descEditShow}
                  setShow={setDescEditShow}
                  text={post.description}
                  id={post._id}
                />
              ) : (
                post.description
              )}
            </span>
            {post.user == user.userId && !descEditShow && (
              <button
                onClick={() => setDescEditShow(!descEditShow)}
                className="ms-2 flex justify-center items-center w-6 h-6 text-white p-1 rounded-full bg-green-700"
              >
                <FontAwesomeIcon className="text-xs" icon={faPen} />
              </button>
            )}
          </div>
          <div className="flex justify-center my-4">
            <img
              className="max-h-72 rounded cursor-pointer hover:opacity-80"
              onClick={() => {
                setPreviewPictures([post.picture]);
                setPreview(true);
                setPreviewPicturesIndex(0);
              }}
              src={post.picture}
            />
          </div>
          <div className="flex justify-center flex-wrap">
            {post.pictures.map((item, index) => (
              <img
                onClick={() => {
                  setPreviewPictures(post.pictures);
                  setPreviewPicturesIndex(index);
                  setPreview(true);
                }}
                className="w-10 m-1 h-10 cursor-pointer hover:opacity-80"
                src={item}
              />
            ))}
          </div>
          <AuthButtons user={user} post={post} />
        </div>
      ) : (
        <Page404/>
      )}
      {preview && previewPictures && (
        <ImagePreview
          setPreview={setPreview}
          preview={preview}
          previewPicturesIndex={previewPicturesIndex}
          images={previewPictures}
        />
      )}
      {/*  {titleEditShow && (
        <EditTitle show={titleEditShow} setShow={setTitleEditShow} />
      )} */}
    </div>
  );
};

export default Post;
