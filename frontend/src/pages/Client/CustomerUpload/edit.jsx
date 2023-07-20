import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "../../Admin//Comics/Comics.module.scss";

const cx = classNames.bind(styles);

const { Option } = Select;

const EditComicForm = () => {
  const { id } = useParams();
  const { client } = useSelector((st) => st.client);
  const [form] = Form.useForm();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}api/genres`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setGenres(data.data);
      }
      setLoading(false);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/mangas/${id}`)
      .then(response => response.json())
      .then(data => {
        setManga(data.data);
        const genreIds = data.data.genres.map(genre => genre.id);
        form.setFieldsValue({ genres: genreIds });
      });
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${client.access_token}`; // Thêm token vào tiêu đề của yêu cầu

      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/mangas/${id}`,
        values
      );

      toast.success("Update Comics Success!");
    } catch (error) {
      console.error(error);
      toast.error("Update Comics Failed!");
    }
  };

  if (loading || !manga) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cx("wrapper")}>
    <Form layout="vertical" form={form} onFinish={handleSubmit} initialValues={{ ...manga }}>
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
        <Select mode="multiple" defaultValue={manga.genres.map(genre => genre.id)}>
          {genres.map(genre => (
            <Option key={genre.id} value={genre.id}>{genre.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Tag" name="tag">
        <Input />
      </Form.Item>
      <Form.Item
        label="Complete"
        name="complete"
        valuePropName="checked"
        rules={[{ required: true }]}
      >
        <Checkbox />
      </Form.Item>
      {/* Thêm trường Select cho giá trị Highlight */}
      <Form.Item
        label="Highlight"
        name="highlight"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="new">New</Option>
          <Option value="popular">Popular</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Comic
        </Button>
      </Form.Item>
      <ToastContainer />
    </Form>
    </div>
  );
};

export default EditComicForm;
