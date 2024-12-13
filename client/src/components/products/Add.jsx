import { Button, Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

function Add({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  products,
  setProduct,
}) {
  const [categoriesAll, setCategoriesAll] = useState([]);
  useEffect(() => {
    setCategoriesAll(categories);
  }, [categories]);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL + "/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi.");
      form.resetFields();
      setProduct([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]); //mevcut kategoriye ekleyerek  sayfayı refres etmeden görmemizi sağladık
      setIsAddModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={() => setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        {/*name dolduracağımız alanınn ismini vericez*/}
        <Form.Item
          name="title"
          label="Ürün Adı"
          rules={[{ required: true, message: "Ürün Alanı Boş Geçilemez !" }]}
        >
          <Input placeholder="Ürün adı giriniz." />
        </Form.Item>
        <Form.Item
          name="img"
          label="Ürün Görseli"
          rules={[
            { required: true, message: "Ürün Görseli Alanı Boş Geçilemez !" },
          ]}
        >
          <Input placeholder="Ürün görseli giriniz." />
        </Form.Item>
        <Form.Item
          name="price"
          label="Ürün Fiyatı"
          rules={[
            { required: true, message: "Ürün Fiyat Alanı Boş Geçilemez !" },
          ]}
        >
          <Input placeholder="Ürün fiyatı giriniz." />
        </Form.Item>
        <Form.Item
          name="category"
          label="Kategori "
          rules={[
            { required: true, message: "Kategori Alanı Boş Geçilemez !" },
          ]}
        >
          <Select
            showSearch
            placeholder="Kategori Seçiniz"
            optionFilterProp="title"
            filterSort={(optionA, optionB) =>
              (optionA?.title ?? "")
                .toLowerCase()
                .localeCompare((optionB?.title ?? "").toLowerCase())
            }
            options={categoriesAll.map((cat) => ({
              title: cat.title,
              value: cat.title,
            }))}
          />
        </Form.Item>
        <Form.Item className="flex justify-end mb-0">
          <Button type="primary" htmlType="submit">
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Add;
