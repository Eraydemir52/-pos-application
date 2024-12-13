import React from "react";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

function ProductItem({ item }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    const payload = {
      _id: item._id,
      title: item.title,
      img: item.img,
      price: item.price,
      category: item.category,
      count: 1,
    };
    dispatch(addProduct(payload));
    message.success("Ürün Sepete Eklendi.");
  };
  return (
    <div
      className="product-item border hover:shadow-lg cursor-pointer transition-all select-none"
      onClick={handleClick}
    >
      <div className="product-img">
        <img
          src={item.img}
          alt=""
          className="h-28 object-cover w-full border-b"
        />
      </div>
      <div className="product-info flex flex-col p-3">
        <span className="font-bold">{item.title}</span>
        <span>{item.price} ₺</span>
      </div>
    </div>
  );
}

export default ProductItem;
