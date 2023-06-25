import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { Upload, ButtonComics } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';


const { Option } = Select;

const InsertComic = () => {
  const [form] = Form.useForm();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);


  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch('http://localhost:8000/api/genres');
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setGenres(data.data);
      }
      setLoading(false);
    };

    fetchGenres();
  }, []);

  // const handleGenresChange = (checkedValues) => {
  //   setGenres((prevGenres) => {
  //     return prevGenres.map((genre) => {
  //       if (checkedValues.includes(genre.name)) {
  //         return { ...genre, checked: true };
  //       } else {
  //         return { ...genre, checked: false };
  //       }
  //     });
  //   });
  // };

  const handleImageUpload = (file) => {
    setImageFile(file);
    return false;
  };
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('des', values.des);
      if(values.complete ) {
        formData.append('complete', 1);
      } else {
        formData.append('complete', 0);
      }
      formData.append('author', values.author);
      formData.append('tag', values.tag);
      formData.append('highlight', values.highlight);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      values.genres.forEach(genreId => {
        formData.append('genres[]', genreId);
      });

      const response = await axios.post('http://localhost:8000/api/mangas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast("Add Comics Success!");
    } catch (error) {
      console.error(error); // Xử lý lỗi nếu có
    }

    form.resetFields();
    setImageFile(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item label="Comic Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Description" name="des">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Author" name="author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Genres" name="genres" rules={[{ required: true }]}>
        <Select mode="multiple">
          {genres.map(genre => (
            <Option key={genre.id} value={genre.id}>{genre.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Highlight" name="highlight" rules={[{ required: true }]}>
        <Select >
          
            <Option  value="popular">Popular</Option>
            <Option  value="new">New</Option>
          
        </Select>
      </Form.Item>
      <Form.Item label="Tag" name="tag">
        <Input />
      </Form.Item>
      <Form.Item label="Complete" name="complete">
        <Checkbox/>
      </Form.Item>
      <Form.Item
        label="Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => [e.file]}
      >
        <Upload
          beforeUpload={handleImageUpload}
          fileList={imageFile ? [imageFile] : []}
        >
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Comic
        </Button>
      </Form.Item>
      <ToastContainer />
    </Form>
  );
};

export default InsertComic;
