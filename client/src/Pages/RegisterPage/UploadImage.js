import React,  {useState} from 'react';
import Button from "@material-ui/core/Button";

function UploadImage({ handleImageChange, image}) {
  return (
    <>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="image" width="300" height="300" />
        ) : (
          <>
            <span>
            </span>
            <h5 className="text-center">Click me to upload your user icon.</h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <br />
    </>
  );
}

export default UploadImage
