import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../config";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList([...response.data.products].reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="admin-data-section" aria-labelledby="catalogue-title">
      <div className="admin-section-heading admin-list-heading">
        <div>
          <p className="admin-section-kicker">THE FOREVER EDIT / CATALOGUE</p>
          <h2 id="catalogue-title">Pieces in the collection.</h2>
        </div>
        <span className="admin-item-count">
          {String(list.length).padStart(2, "0")} PRODUCTS
        </span>
      </div>

      <div className="admin-product-list">
        <div className="admin-product-list-header" aria-hidden="true">
          <span>IMAGE</span>
          <span>PRODUCT</span>
          <span>CATEGORY</span>
          <span>PRICE / INR</span>
          <span />
        </div>

        {isLoading ? (
          <div className="admin-empty-state">
            <span className="admin-loading-mark" />
            <p>LOADING THE COLLECTION</p>
          </div>
        ) : list.length ? (
          list.map((item) => (
            <article className="admin-product-row" key={item._id}>
              <img
                className="admin-product-image"
                src={item.image?.[0]}
                alt={item.name}
              />
              <div className="admin-product-name">
                <strong>{item.name}</strong>
                <span>{item.subCategory}</span>
              </div>
              <span className="admin-product-category">{item.category}</span>
              <strong className="admin-product-price">
                {currency}{Number(item.price).toLocaleString("en-IN")}
              </strong>
              <button
                className="admin-remove-button"
                type="button"
                onClick={() => removeProduct(item._id)}
                aria-label={`Remove ${item.name}`}
                title="Remove product"
              >
                ×
              </button>
            </article>
          ))
        ) : (
          <div className="admin-empty-state">
            <p className="admin-section-kicker">A QUIET COLLECTION</p>
            <h3>No products yet.</h3>
            <p>Add the first piece to start building your edit.</p>
          </div>
        )}
      </div>
    </section>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;
