import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function CreateBill({ isModalOpen, setIsModalOpen }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            cartItems: cart.cartItems,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti.");
      console.log(error);
    }
    setIsModalOpen(false);
  };
  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[
            { required: true, message: "Müşteri Adı Alanı Boş Geçilemez !" },
          ]}
        >
          {/*  rules={[{ required: true }]} zorunlu değer olması için */}
          <Input placeholder="Bir Müşteri Adı Yazınız " />
        </Form.Item>
        <Form.Item
          name={"customerPhoneNumber"}
          label="Tel No"
          rules={[{ required: true, message: "" }]}
        >
          <Input placeholder="Tel No Yazınız" maxLength={11} />
        </Form.Item>
        <Form.Item
          name={"paymentMode"}
          label="Ödeme Yöntemi"
          rules={[{ required: true }]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit"></Select.Option>
            <Select.Option value="Kredi Kartı"></Select.Option>
          </Select>
        </Form.Item>

        <Card>
          <div className="flex justify-between">
            <span>Ara Toplam </span>
            <span>{cart.total > 0 ? cart.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between my-2">
            <span>KDV %{cart.tax}</span>
            <span className="text-red-600">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between">
            <b>Genel Toplam </b>
            <b className="bo">
              {cart.total + (cart.total * cart.tax) / 100 > 0
                ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                : 0}
              ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              className="mt-4 "
              htmlType="submit"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
}

export default CreateBill;
