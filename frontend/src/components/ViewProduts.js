import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag } from "antd";
import Search from "../assets/Produt/search.svg";
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    prductName: "Plates and bowls",
    category: "Plates and bowls",
    quantity: 12,
    unitPrice: "$14.00",
    totalRevnue: "$54,900",
  },
  
];

const ViewProduts = () => {
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
          />
          <img
            src={Search}
            className="absolute end-2.5 bottom-1 z-10 focus:ring-blue-300 font-medium rounded-lg text-sm pr-1 py-1"
          />
        </div>
        <div className="flex justify-end">
          <Button className="h-full md:px-[63px] rounded-lg bg-[#764EE8] text-[#FFFFFF] font-medium text-[13px] font-jakarta">
            Add Product
          </Button>
        </div>
      </div>

      <div>
        <h1 className="font-normal text-[#000000] text-[13px] font-jakarta mt-[30px] mb-[20px]">
          213 Products in Total
        </h1>
        <div>
          <Table
            dataSource={data}
            // scroll={{
            //   x: 1500,
            //   y: 300,
            // }}
          >
            <Column title="PRODUCTS" dataIndex="prductName" key="prductName" />
            <Column title="Category" dataIndex="category" key="category" />
            <Column title="Quantity" dataIndex="quantity" key="quantity" />
            <Column title="Unit Price" dataIndex="unitPrice" key="unitPrice" />
            <Column
              title="TOTAL REVENUE"
              dataIndex="totalRevnue"
              key="totalRevnue"
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ViewProduts;
