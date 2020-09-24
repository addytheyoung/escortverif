import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class CropTest extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    src: null,
    crop: {
      aspect: 100 / 100,
      width: 200,
      height: 200,
      unit: "px",

      // x: (window.innerWidth - window.innerWidth) / 2,
      // y: (window.innerWidth - window.innerWidth) / 2,
    },
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.aspect) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      // this.props.setCroppedImg(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }

        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.props.setCroppedImg(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const picture = this.props.picture;
    const { crop, croppedImageUrl, src } = this.state;
    const { showCroppedImage, showOriginalImage } = this.props;
    const screenWidth = window.innerWidth;

    return (
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {showOriginalImage && (
          <ReactCrop
            src={picture}
            crop={crop}
            ruleOfThirds
            circularCrop={true}
            // style={{ height: "30vh" }}
            imageStyle={{ maxHeight: "40vh" }}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}

        <div style={{ width: 30, height: 30 }}></div>

        {croppedImageUrl && showCroppedImage && (
          <img
            id="cropped-image"
            alt="Crop"
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              borderStyle: "solid",
              borderColor: "transparent",
            }}
            src={croppedImageUrl}
          />
        )}
      </div>
    );
  }
}
