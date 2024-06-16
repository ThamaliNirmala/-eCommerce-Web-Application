import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
  Image,
  Upload,
  notification,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { EMPTY_FEILD_VALIDATION } from "../helpers/helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AddProduct = ({ isEdit = false }) => {
  const [productSKU, setProductSKU] = useState(null);
  const [productName, setProductName] = useState(null);
  const [productDesc, setProductDesc] = useState(null);
  const [unit, setUnit] = useState(null);
  const [unitPrice, setUnitPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [catagory, setCatagory] = useState(null);
  const [photos, setPhotos] = useState(null);
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);

  const { page, id } = queryString.parse(window.location.search);
  useEffect(() => {
    if (isEdit && id)
      (async () =>
        await axios
          .get(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
          .then((res) => {
            form.setFieldValue("productSku", res.data.productSKU);
            form.setFieldValue("productName", res.data.productName);
            form.setFieldValue("productDesc", res.data.productDesc);
            form.setFieldValue("selectUnit", res.data.unit);
            form.setFieldValue("unitPrice", res.data.unitPrice);
            form.setFieldValue("quantity", res.data.quantity);
            form.setFieldValue("selectCategory", res.data.catagory);

            setProductSKU(res.data.productSKU);
            setProductName(res.data.productName);
            setProductDesc(res.data.productDesc);
            setUnit(res.data.unit);
            setUnitPrice(res.data.unitPrice);
            setQuantity(res.data.quantity);
            setCatagory(res.data.catagory);
            setFileList(
              res.data.images.map((el) => ({ url: "/images/" + el }))
            );
            setIsUpdated(false);
          })
          .catch((err) =>
            notification.error({
              message: "Server Error",
              placement: "topRight",
            })
          ))();
  }, [isEdit, isUpdated]);

  const [form] = Form.useForm();
  const nameValue = Form.useWatch("name", form);
  // The selector is static and does not support closures.
  const customValue = Form.useWatch(
    (values) => `name: ${values.name || ""}`,
    form
  );

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      if (!fileList.length)
        notification.error({
          message: "You Should Upload at least one Image",
          placement: "topRight",
        });
      else {
        const formData = new FormData();
        formData.append("productSKU", productSKU);
        formData.append("productName", productName);
        formData.append("productDesc", productDesc);
        formData.append("unit", unit);
        formData.append("unitPrice", unitPrice);
        formData.append("quantity", quantity);
        formData.append("catagory", catagory);
        fileList
          .filter((el) => el.name)
          .forEach((file) => {
            formData.append("photos", file.originFileObj);
          });
        if (isEdit) {
          await axios
            .put(`${process.env.REACT_APP_BASE_URL}/post/${id}`, formData)
            .then(() => {
              notification.success({
                message: "Post Updated Successfully",
                placement: "topRight",
              });
              setIsUpdated(true);
            });
        } else {
          await axios
            .post(`${process.env.REACT_APP_BASE_URL}/post`, formData)
            .then(() => {
              notification.success({
                message: "Post Added Successfully",
                placement: "topRight",
              });
              setIsUpdated(true);
              navigate("/");
            });
        }
      }
    } catch (error) {
      notification.success({
        message: "Error occured",
        placement: "topRight",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/${id}`).then(() => {
        notification.success({
          message: "Post Deleted Successfully",
          placement: "topRight",
        });
        setIsUpdated(true);
        navigate("/");
      });
    } catch (error) {
      notification.success({
        message: "Error occured",
        placement: "topRight",
      });
    }
  };

  return (
    <div>
      <div className="md:mt-[28px] ml-3 mt-[20px]">
        <h1 className="font-semibold md:text-[26px] text-[20px] text-[#000000] font-jakarta">
          {isEdit ? "Edit" : "Add"} Product
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
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Input
                  className="p-[6px]"
                  onChange={(e) => setProductSKU(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="productName"
                label="Product Name"
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Input onChange={(e) => setProductName(e.target.value)} />
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                />
              </Form.Item>
              <Form.Item
                name="productDesc"
                label="Product Description"
                rules={EMPTY_FEILD_VALIDATION}
              >
                <TextArea
                  autoSize={{
                    minRows: 5,
                    maxRows: 10,
                  }}
                  onChange={(e) => setProductDesc(e.target.value)}
                />
              </Form.Item>

              <h1 className="font-jakarta font-semibold md:text-[20px] text-xs md:mt-[35px]  mt-[20px]">
                Units
              </h1>
              <Form.Item
                name="selectUnit"
                label="Select Unit"
                className="mt-[10px] "
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Select
                  optionFilterProp="children"
                  onSelect={(e) => setUnit(e)}
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
                      value: "Inches",
                      label: "Inches",
                    },
                    {
                      value: "CM",
                      label: "CM",
                    },
                    {
                      value: "M",
                      label: "M",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                name="unitPrice"
                label="Price per Unit"
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Input
                  onChange={(e) => setUnitPrice(e.target.value)}
                  type="number"
                />
              </Form.Item>
              <h1 className="font-jakarta font-semibold md:text-[20px] text-xs md:mt-[35px]  mt-[20px]">
                Category
              </h1>

              <Form.Item
                name="selectCategory"
                label="Select Category"
                className="mt-[10px] "
                rules={EMPTY_FEILD_VALIDATION}
              >
                <Select
                  optionFilterProp="children"
                  onSelect={(e) => setCatagory(e)}
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
                      value: "Plates and bowls",
                      label: "Plates and bowls",
                    },
                    {
                      value: "Ceramics",
                      label: "Ceramics",
                    },
                    {
                      value: "Glass",
                      label: "Glass",
                    },
                    {
                      value: "Bathware",
                      label: "Bathware",
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
            <p className="text-gray-500 text-[12px] font-medium font-jakarta mt-3 leading-tight">
              Lorem ipsum dolor sit amet consectetur. Pharetra sed arcu nunc
              quisque nisl vitae dolor sapien nascetur. Tellus imperdiet orci
              tellus enim
            </p>

            <div className="mt-5">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={null}
                showUploadList={{ showRemoveIcon: false }}
                multiple
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mb-8">
          <Button
            className="h-full md:px-[63px] rounded-lg bg-[red] text-[#FFFFFF] font-medium text-[13px] font-jakarta py-[10px]"
            onClick={handleDelete}
            type="button"
          >
            Delete Product
          </Button>{" "}
          <Button
            className="h-full md:px-[63px] rounded-lg bg-[#764EE8] text-[#FFFFFF] font-medium text-[13px] font-jakarta py-[10px]"
            onClick={handleSubmit}
            type="button"
          >
            {isEdit ? "Edit" : "Add"} Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
