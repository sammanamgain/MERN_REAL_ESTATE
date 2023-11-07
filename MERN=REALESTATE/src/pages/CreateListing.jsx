import { useState } from "react";
import { app } from "./../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [file, setfile] = useState([]);

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleimageupload = (e) => {
    console.log(e);
    if (file.length > 0 && file.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handledelete = (index) =>
  {
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((url,i)=>i!==index)
    })
  }
  console.log(formData.imageUrls);

  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7">
        {" "}
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1  ">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className=" flex gap-6 flex-wrap ">
            <div className="flex gap-2 ">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className=" flex items-center gap-2">
              <input
                className="p-3 border-grey-300 rounded-lg"
                type="number"
                id="bedroom"
                min="1"
                max="10"
                required
              />
              <p> Beds</p>
            </div>

            <div className=" flex items-center gap-2">
              <input
                className="p-3 border-grey-300 rounded-lg"
                type="number"
                id="bath"
                min="1"
                max="10"
                required
              />
              <p> Baths</p>
            </div>

            <div className=" flex items-center gap-2">
              <input
                className="p-3 border-grey-300 rounded-lg"
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p> Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>

            <div className=" flex items-center gap-2">
              <input
                className="p-3 border-grey-300 rounded-lg"
                type="number"
                id="discountedprice"
                min="1"
                max="10"
                required
              />
              <div className="flex flex-col items-center">
                <p> Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-grey-700 ml-2">
              The first image will be the cover (max 6){" "}
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={(e) => {
                setfile(e.target.files);
              }}
              className="p-3 border border-grey-300 rounded w-full "
              type="file"
              id="images"
              accept="images/*"
              multiple
            />
            <button
              type="button"
              disabled={uploading}
              onClick={handleimageupload}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading? "uploading...":"upload"}
            </button>
          </div>
          <p className="text-red-700 ">{imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url,index) => (
              <div key={url} className="flex justify-between p-3 border items-center">
                <img src={url} alt='image' className="w-20 h-20 object-contain rounded-lg"/>
                <button onClick={()=>handledelete(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
             </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            {" "}
            Create Listing{" "}
          </button>
        </div>
      </form>
    </main>
  );
}
