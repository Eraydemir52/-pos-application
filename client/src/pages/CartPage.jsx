import React, { useRef, useState } from "react";
import Header from "../components/Header/Header";
import { Button, Input, Modal, Popconfirm, Space, Table } from "antd";
import Card from "antd/es/card/Card";
import CreateBill from "../components/card/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { decrease, deleteCart, increase } from "../redux/cartSlice";
import Highlighter from "react-highlight-words";

function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      //text sadece key veya dataindexdeki img alıyor ama record tüm satırı
      render: (text) => {
        return <img src={text} className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)} ₺</span>;
      },
      //tabloda sıralama
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "count",
      key: "count",
      render: (text, record) => {
        return (
          <div className="flex items-center ">
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<PlusCircleOutlined />}
              onClick={() => dispatch(increase(record))}
            />
            <span className="font-bold w-6 inline-block text-center">
              {record.count}
            </span>
            <Button
              type="primary"
              size="small"
              className="w-full flex items-center justify-center !rounded-full"
              icon={<MinusCircleOutlined />}
              onClick={() => {
                if (record === 1) {
                  if (window.confirm("Ürün Silinsin Mi ?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi.");
                  }
                }
                if (record > 1) {
                  dispatch(decrease(record));
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      render: (text, record) => {
        return <span>{(record.count * record.price).toFixed(2)} ₺</span>;
      },
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Silmek için emin misiniz ?"
            onConfirm={() => {
              dispatch(deleteCart(record));
              message.success("Ürün Sepetten Silindi.");
            }}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="link" danger>
              Sil
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          rowKey={(record) => record._id}
          scroll={{
            x: 1200,
            y: 300,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="w-72">
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
            <Button
              onClick={() => setIsModalOpen(true)}
              type="primary"
              className="mt-4 w-full"
              size="large"
              disabled={cart.cartItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}

export default CartPage;