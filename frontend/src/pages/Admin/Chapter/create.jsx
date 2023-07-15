import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { Upload, ButtonComics } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Title from "@/components/Admin/Title";
import axios from 'axios';


const { Option } = Select;

const AddComicForm = () => {
  const [form] = Form.useForm();
  const [imageFiles, setImageFiles] = useState([]);
  const { id } = useParams();

  const handleImageUpload = (file) => {
    setImageFiles(prevState => prevState.concat(file));
    return false;
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      for (let i = 0; i < imageFiles.length; i++) {
        formData.append(`image_path[${i}]`, imageFiles[i]);
      }

      const response = await axios.post(`${process.env.BASE_URL}api/mangas/${id}/chapter`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast("Add Chapter Succe!");
    } catch (error) {
      console.error(error);
    }

    form.resetFields();
    setImageFiles([]);
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Title title="Add Chapter" />
      <Form.Item label="Chapter Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Images"
        name="image_path"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
        rules={[{ required: true }]}
      >
        <Upload
          beforeUpload={handleImageUpload}
          multiple={true}
          fileList={imageFiles}
        >
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button style={{ backgroundColor: '#6a0dad', color: '#fff' }}
          type="primary" htmlType="submit">
          Add Chapter
        </Button>
      </Form.Item>
      <ToastContainer />
    </Form>
  );
};

export default AddComicForm;
