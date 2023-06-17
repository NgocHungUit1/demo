import { Table } from "antd";

function TableComp(props) {

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <Table columns={props.columns} dataSource={props.data} onChange={onChange} />
    );
}
export default TableComp;
