import React, { useState } from 'react'
import { dummyUserData } from '../assets/assets';
import { Image, X } from 'lucide-react';
import toast from 'react-hot-toast'

const CreatePost = () => {
  const [contents, setContents] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleImageChange = (e) => {
    const MAX_IMAGES = 5;
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    const files = Array.from(e.target.files);
    let validFiles = [];

    setError(""); // reset error

    for (let file of files) {
      // type check
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`${file.name} is not a supported image type`);
        continue;
      }

      // size check
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds 2MB`);
        continue;
      }

      // duplicate check
      const exists = images.some(
        (img) => img.name === file.name && img.size === file.size,
      );

      if (exists) {
        setError(`${file.name} is already selected`);
        continue;
      }

      validFiles.push(file);
    }

    // limit check
    if (images.length + validFiles.length > MAX_IMAGES) {
      setError(`You can upload up to ${MAX_IMAGES} images only`);
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);

    // allow re-select same file
    e.target.value = "";
  };

  const handleSubmit = async () => {
    
  }
  const onSubmit = () => {
    toast.promise(handleSubmit(), {
      loading: "Uploading...",
      success: "Post Added",
      error: "Post Not Added",
    });
  };



  const user = dummyUserData;
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-6xl p-6 mx-auto">
        {/* title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Create Posts
          </h1>
          <p className="text-slate-600">Share your thoughts with the word</p>
        </div>
        {/* form */}
        <div className="max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-ms space-y-4">
          {/* header */}
          <div className="flex items-center gap-3">
            <img
              src={user.profile_picture}
              alt=""
              className="w-12 h-12 rounded-full shadow"
            />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">{user.username}</p>
            </div>
          </div>
          {/* text area */}

          <textarea
            name=""
            id=""
            className="w-full max-h-20 resize-none mt-4 text-sm outline-none placeholder-gray-400"
            placeholder="What's happing"
            onChange={(e) => setContents(e.target.value)}
            value={contents}
          />

          {/* images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-20 rounded-md"
                    alt=""
                  />
                  <div
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((_, index) => index !== i),
                      )
                    }
                    className="absolute hidden group-hover:flex justify-center items-center top-0 bottom-0 
                  right-0 left-0 bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="h-6 w-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

          {/* bottom bar */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-300">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700
            transition cursor-pointer"
            >
              <Image className="size-6" />
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              capture="environment"
              onChange={handleImageChange}
            />
            <button disabled={loading} onClick={onSubmit}
              className="flex items-center text-sm justify-center px-8 py-2  rounded-lg
        bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-700 to-purple-700 active:scale-95
        transition text-white cursor-pointer "
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost