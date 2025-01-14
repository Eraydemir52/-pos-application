import React, { useEffect, useState } from "react";
import CardTotals from "../components/card/CardTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/Header/Header";
import Products from "../components/products/Products";
import { Spin } from "antd";

function HomePage() {
  const [categories, setCategories] = useState();
  const [products, setProduct] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/categories/get-all"
        );
        const data = await response.json();

        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const respose = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await respose.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [products]);
  console.log(search);

  return (
    <>
      <Header setSearch={setSearch} />
      {products && categories ? (
        <div className="home px-6 flex md:flex-row flex-col justify-between gap-10 md:pb-0 pb-24 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] max-h-[calc(100vh_-_112px)] overflow-y-auto pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProduct={setProduct}
              search={search}
            />
          </div>
          <div
            className="cart-wrapper min-w-[300px] md:-mr-[24px]  md:-mt-[24px] border
      "
          >
            <CardTotals />
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/2 h-screen w-screen flex  justify-center"
        />
      )}
    </>
  );
}

export default HomePage;
