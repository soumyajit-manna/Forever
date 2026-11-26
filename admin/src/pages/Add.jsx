import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../config";
import { toast } from "react-toastify";

const sizesList = ["S", "M", "L", "XL", "XXL"];

const ImageUploadTile = ({ index, file, onChange }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <label className="admin-upload-tile" htmlFor={`product-image-${index}`}>
      <img src={preview || assets.upload_area} alt="" />
      <span className="admin-upload-label">{file ? "IMAGE READY" : `IMAGE 0${index}`}</span>
      <input
        id={`product-image-${index}`}
        className="admin-file-input"
        accept="image/*"
        type="file"
        onChange={(event) => {
          onChange(event.target.files?.[0] || null);
          event.target.value = "";
        }}
      />
    </label>
  );
};

ImageUploadTile.propTypes = {
  index: PropTypes.number.isRequired,
  file: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateImage = (index, file) => {
    setImages((current) => current.map((image, imageIndex) => (
      imageIndex === index ? file : image
    )));
  };

  const toggleSize = (size) => {
    setSizes((current) => (
      current.includes(size)
        ? current.filter((value) => value !== size)
        : [...current, size]
    ));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image) formData.append(`image${index + 1}`, image);
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="admin-form-card">
      <div className="admin-form-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-section-kicker">01 / PRODUCT IMAGERY</p>
            <h2>Make the first impression.</h2>
          </div>
          <span>UP TO 04 IMAGES</span>
        </div>
        <div className="admin-upload-grid">
          {images.map((image, index) => (
            <ImageUploadTile
              key={index}
              index={index + 1}
              file={image}
              onChange={(file) => updateImage(index, file)}
            />
          ))}
        </div>
      </div>

      <div className="admin-form-section">
        <div className="admin-section-heading">
          <div>
            <p className="admin-section-kicker">02 / PRODUCT DETAILS</p>
            <h2>Give it a name and a story.</h2>
          </div>
          <span>ALL FIELDS REQUIRED</span>
        </div>
        <div className="admin-form-grid">
          <label className="admin-field admin-field-wide">
            <span>PRODUCT NAME</span>
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              type="text"
              placeholder="e.g. Everyday cotton shirt"
              required
            />
          </label>
          <label className="admin-field admin-field-wide">
            <span>DESCRIPTION</span>
            <textarea
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              rows="4"
              placeholder="Describe the details that make this piece special..."
              required
            />
          </label>
          <label className="admin-field">
            <span>CATEGORY</span>
            <select onChange={(event) => setCategory(event.target.value)} value={category}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </label>
          <label className="admin-field">
            <span>SUBCATEGORY</span>
            <select onChange={(event) => setSubCategory(event.target.value)} value={subCategory}>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </label>
          <label className="admin-field">
            <span>PRICE / INR</span>
            <div className="admin-price-field">
              <b aria-hidden="true">₹</b>
              <input
                onChange={(event) => setPrice(event.target.value)}
                value={price}
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                required
              />
            </div>
          </label>
          <fieldset className="admin-field admin-size-field">
            <legend>AVAILABLE SIZES</legend>
            <div className="admin-size-options">
              {sizesList.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={sizes.includes(size) ? "is-selected" : ""}
                  aria-pressed={sizes.includes(size)}
                  onClick={() => toggleSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <label className="admin-bestseller-option">
          <input
            onChange={(event) => setBestseller(event.target.checked)}
            checked={bestseller}
            type="checkbox"
          />
          <span className="admin-checkbox-mark" aria-hidden="true" />
          <span>
            <strong>FEATURE IN THE MOST-LOVED EDIT</strong>
            <small>Mark this product as a bestseller.</small>
          </span>
        </label>
      </div>

      <div className="admin-form-actions">
        <p>PRODUCT DETAILS / FOREVER COLLECTION</p>
        <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "ADDING PRODUCT..." : "ADD PRODUCT"}</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;
