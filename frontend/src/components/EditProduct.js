import React from "react";
import { Button, Form, Input, InputNumber, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

const EditProduct = () => {
  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);
  // The selector is static and does not support closures.
  const customValue = Form.useWatch(
    (values) => `name: ${values.name || ""}`,
    form
  );

  return (
    <div>
      <div className="md:mt-[28px] ml-3 mt-[20px]">
        <h1 className="font-semibold md:text-[26px] text-[20px] text-[#000000] font-jakarta">
          Add Product
        </h1>

        <div className="grid md:grid-cols-12  gap-3 mt-5 mb-10">
          <div className="md:col-span-7 bg-white rounded-lg md:p-[30px] p-[10px]">
            <h1 className="font-jakarta font-semibold md:text-[20px] text-xs">
              General Information
            </h1>
            <Form form={form} layout="vertical" autoComplete="off">
              <Form.Item
                name="productSku"
                label="Product SKU"
                className="mt-[10px] "
              >
                <Input className="p-[6px]" />
              </Form.Item>
              <Form.Item name="productName" label="Product Name">
                <Input />
              </Form.Item>
              <Form.Item name="productDesc" label="Product Description">
                <TextArea
                  autoSize={{
                    minRows: 5,
                    maxRows: 10,
                  }}
                />
              </Form.Item>

              <h1 className="font-jakarta font-semibold md:text-[20px] text-xs md:mt-[35px]  mt-[20px]">
                Units
              </h1>
              <Form.Item
                name="selectUnit"
                label="Select Unit"
                className="mt-[10px] "
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                    {
                      value: "3",
                      label: "Communicated",
                    },
                    {
                      value: "4",
                      label: "Identified",
                    },
                    {
                      value: "5",
                      label: "Resolved",
                    },
                    {
                      value: "6",
                      label: "Cancelled",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item name="unitPrice" label="Price per Unit">
                <Input />
              </Form.Item>
              <h1 className="font-jakarta font-semibold md:text-[20px] text-xs md:mt-[35px]  mt-[20px]">
                Category
              </h1>

              <Form.Item
                name="selectCategory"
                label="Select Category"
                className="mt-[10px] "
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                    {
                      value: "3",
                      label: "Communicated",
                    },
                    {
                      value: "4",
                      label: "Identified",
                    },
                    {
                      value: "5",
                      label: "Resolved",
                    },
                    {
                      value: "6",
                      label: "Cancelled",
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          </div>
          <div className="md:col-span-5 bg-white rounded-lg md:p-[30px] p-[10px]">
            <h1 className="font-jakarta font-semibold md:text-[20px] text-xs">
              Product Images
            </h1>
            <p className="text-gray-500 text-[12px] font-medium font-jakarta mt-3 leading-tight">Lorem ipsum dolor sit amet consectetur. Pharetra sed arcu nunc quisque nisl vitae dolor sapien nascetur. Tellus imperdiet orci tellus enim</p>
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <Button className="h-full md:px-[63px] rounded-lg bg-[#764EE8] text-[#FFFFFF] font-medium text-[13px] font-jakarta py-[10px]">
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
