import { Table, Pagination, Select } from "antd";
import React from 'react';
import { PaginationProps } from 'antd';

const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
        return <a>Previous</a>;
    }
    if (type === 'next') {
        return <a>Next</a>;
    }
    return originalElement;
};

function TableComp(props) {
    const pageSizeOptions = [2, 5, 10]; // Các tùy chọn cho select

    const [pagination, setPagination] = React.useState({
        current: 1,
        pageSize: 10,
    });

    const handleChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
        setPagination(pagination);
    };

    const handlePageSizeChange = (value) => {
        setPagination({ ...pagination, pageSize: value, current: 1 });
    }

    return (
        <>
            <Table
                columns={props.columns}
                dataSource={props.data}
                pagination={pagination}
                onChange={handleChange}
                pageSize={pagination.pageSize}
            />
            {/* <div >
                <Pagination
                    total={props.data.length}
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    itemRender={itemRender}
                    showSizeChanger={false}
                />
                <Select size="small" defaultValue={pagination.pageSize} onChange={handlePageSizeChange}>
                    {pageSizeOptions.map((option) => (
                        <Select.Option key={option} value={option}>
                            {`${option} / page`}
                        </Select.Option>
                    ))}
                </Select>
            </div> */}
        </>
    );
}

export default TableComp;
