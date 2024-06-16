import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, notification } from "antd";
import Search from "../assets/Produt/search.svg";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
const { Column, ColumnGroup } = Table;

const ViewProduts = () => {
  const { page, id } = queryString.parse(window.location.search);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () =>
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/post`)
        .then((res) => {
          setPosts(res.data);
          setFilteredPosts(res.data);
        })
        .catch((err) =>
          notification.error({ message: "Server Error", placement: "topRight" })
        ))();
  }, []);

  const handleSearch = () => {
    if (query)
      setFilteredPosts(
        posts.filter((element) =>
          element.productName.toLowerCase().includes(query.toLowerCase())
        )
      );
  };

  return (
    <div>
      <div className="md:mt-[28px]">
        <h1 className="font-semibold text-[26px] text-[#000000] font-jakarta">
          Products
        </h1>
      </div>

      <div className="grid grid-cols-2 mt-[15px]">
        <div className="relative">
          <Input
            placeholder="Search"
            type="search"
            prefix={<SearchOutlined className="mr-2 text-[#D0D5DD]" />}
            className="w-full py-2 px-4 rounded-lg"
            onChange={(e) => {
              if (e.target.value) setQuery(e.target.value);
              else setFilteredPosts(posts);
            }}
          />
          <img
            src={Search}
            className="absolute end-2.5 bottom-1 z-10 focus:ring-blue-300 font-medium rounded-lg text-sm pr-1 py-1 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="h-full md:px-[63px] rounded-lg bg-[#764EE8] text-[#FFFFFF] font-medium text-[13px] font-jakarta"
            onClick={() => navigate("?page=addProduct")}
          >
            Add Product
          </Button>
        </div>
      </div>

      <div>
        <h1 className="font-normal text-[#000000] text-[13px] font-jakarta mt-[30px] mb-[20px]">
          {posts.length} Products in Total
        </h1>
        <div>
          <Table
            dataSource={[...filteredPosts]}
            rowClassName={"cursor-pointer"}
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  navigate(`?page=editProduct&id=${record._id}`);
                }, // click row
              };

            }}
            // scroll={{
            //   x: 1500,
            //   y: 300,
            // }}
          >
            <Column
              title="PRODUCTS"
              key="productName"
              render={(record) => (
                <div className="grid grid-cols-2">
                  <div className="w-16 ">
                    <img
                      src={`/images/${record.images?.[0]}`}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div>{record.productName}</div>
                    <div>{record.productSKU}</div>
                  </div>
                </div>
              )}
            />
            <Column
              title="Category"
              key="category"
              render={(record) => <div className="">{record.catagory}</div>}
            />
            <Column
              title="Quantity"
              key="quantity"
              render={(record) => (
                <div className="">${record.quantity.toFixed(2)}</div>
              )}
            />
            <Column
              title="Unit Price"
              key="unitPrice"
              render={(record) => (
                <div className="">${record.unitPrice.toFixed(2)}</div>
              )}
            />
            <Column
              title="TOTAL REVENUE"
              key="totalRevnue"
              render={(record) => (
                <div className="">
                  ${(record.quantity * record.unitPrice).toFixed(2)}
                </div>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduts;