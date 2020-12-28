import React, {
  useState,
  useEffect
} from 'react';
import {
  Divider,
  Button,
  Select,
  DatePicker,
  Table,
  Form,
} from 'antd';
import moment from 'moment';
import './index.css';

// ----------------------------statistic表格列---------------------------------------

const statistic = [
  {
    key: '1',
    name: 'A',
    money: 400,
    ordertime: "2020-11-24",
    overtime: "2020-11-25",
    account: "ABCD1001",
    operation: "可下载",
    state: "已下单",
  },
  {
    key: '2',
    name: 'B',
    money: 800,
    ordertime: "2020-11-24",
    overtime: "2020-11-25",
    account: "ABCD1002",
    operation: "可下载",
    state: "未结算",
  },
  {
    key: '3',
    name: 'B',
    money: 1400,
    ordertime: "2020-11-24",
    overtime: "2020-11-27",
    account: "ABCD1003",
    operation: "可下载",
    state: "未结算",
  },
  {
    key: '4',
    name: 'A',
    money: 900,
    ordertime: "2020-11-24",
    overtime: "2020-11-27",
    account: "ABCD1004",
    operation: "生成中",
    state: "已结算",
  },
  {
    key: '5',
    name: 'C',
    money: 600,
    ordertime: "2020-11-24",
    overtime: "2020-11-27",
    account: "ABCD1005",
    operation: "生成中",
    state: "已结算",
  },
  {
    key: '6',
    name: 'B',
    money: 600,
    ordertime: "2020-11-21",
    overtime: "2020-11-27",
    account: "ABCD1006",
    operation: "生成中",
    state: "已取消",
  },
  {
    key: '7',
    name: 'C',
    money: 600,
    ordertime: "2020-11-21",
    overtime: "2020-11-27",
    account: "ABCD1007",
    operation: "生成中",
    state: "已下单",
  },
  {
    key: '8',
    name: 'A',
    money: 600,
    ordertime: "2020-11-21",
    overtime: "2020-11-27",
    account: "ABCD1008",
    operation: "生成中",
    state: "已结算",
  },
  {
    key: '9',
    name: 'A',
    money: 600,
    ordertime: "2020-11-21",
    overtime: "2020-11-25",
    account: "ABCD1009",
    operation: "可下载",
    state: "未结算",
  },
  {
    key: '10',
    name: 'C',
    money: 600,
    ordertime: "2020-11-21",
    overtime: "2020-11-25",
    account: "ABCD1234",
    operation: "生成中",
    state: "已取消",
  },
];
// -----------------------------colunm表格列---------------------------------------

const columns = [
  {
    title: '序号',
    dataIndex: 'key',
    width: "70px",
  },
  {
    title: '订单名称',
    dataIndex: 'name',
    width: "100px",
  },
  {
    title: '下单账号',
    dataIndex: 'account',
    width: "100px",
  },
  {
    title: '订单状态',
    dataIndex: 'state',
    width: "100px",
  },
  {
    title: '订购金额(元/人民币)',
    dataIndex: 'money',
    width: "200px",
  },
  {
    title: '下单时间',
    dataIndex: 'ordertime',
    width: "100px",
  },
  {
    title: '结算时间',
    dataIndex: 'overtime',
    width: "100px",
  },
  {
    title: '报告状态',
    dataIndex: 'operation',
    width: "70px",
  },
];

// -----------------------------函数构建-----------------------------------

const SelectForm = () => {

  // -----------------------------state构建-----------------------------------

  const [moneyall, setMoneyall] = useState(0);
  const [orderall, setOrderall] = useState(0);
  const [data, setData] = useState(0);
  const [data_origin, setData_origin] = useState(0);
  const [date_moment, setDate_moment] = useState(0);
  const [datefrom_string, setDatefrom_string] = useState("2020-11-08");
  const [dateto_string, setDateto_string] = useState("2020-12-01");

  // -----------------------------useEffect-----------------------------------

  useEffect(() => {
    let res = statistic;
    let count = 0;

    console.log(res);
    for (let i = 0; i < res.length; i++) {
      count += res[i].money;
    }
    //将表的内容储存入state
    setData(res);
    setData_origin(res);
    setMoneyall(count);
    setOrderall(res.length);
  }, [])

  // -----------------------------数据筛选函数-----------------------------------
  const select = values => {
    let select = [];
    let count = 0;
    select = data_origin.filter(index => {
      return (
        (values.time_from === undefined || values.time_from.unix() <= moment(index.ordertime).unix()) &&
        (values.time_to === undefined || values.time_to.unix() >= moment(index.overtime).unix()) &&
        (values.name === index.name || values.name === "all") &&
        (values.report_state === index.operation || values.report_state === "all") &&
        (values.order_state === index.state || values.order_state === "all")
      )
    })

    for (let i = 0; i < select.length; i++) {
      count += select[i].money;
    }

    setData(select);
    setOrderall(select.length);
    setMoneyall(count);

    if (values.time_from !== undefined) {
      setDatefrom_string(values.time_from.format("YYYY-MM-DD"));
    }

    if (values.time_to !== undefined)
      setDateto_string(values.time_to.format("YYYY-MM-DD"));
  }

  const onFinish = values => {
    select(values);
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // -----------------------------计算时间之前---------------------------------------

  const disabledDatefrom = current => {
    return current && current < moment("20201108", "YYYYMMDD");
  }

  const ontimechange = (time_moment) => {
    setDate_moment(time_moment);
  }

  const disabledDateto = current => {
    if (date_moment === 0) {
      return current && current < moment("20201108", "YYYYMMDD");
    }
    return current && current < date_moment;
  }

  // -----------------------------开始渲染-------------------------------------------

  return (
    <div>
      <div className="time" style={{ marginBottom: 24 }}>
        {/* ----------------------------------------筛选表单----------------------------------------------------------------------------- */}

        <Form
          layout="inline"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Divider />

          <div style={{ margin: '5px 10px' }}>
            <span>下单时间：</span>
          </div>

          <Form.Item name="time_from">
            <DatePicker
              className="date-year"
              disabledDate={disabledDatefrom}
              onChange={ontimechange}
              defaultPickerValue={moment("20201108", "YYYYMMDD")} />
          </Form.Item>

          <span style={{ margin: "5px 15px 5px 0px" }}>至</span>

          <Form.Item name="time_to">

            <DatePicker
              className="date-year"
              disabledDate={disabledDateto}
              defaultPickerValue={moment("20201108", "YYYYMMDD")} />
          </Form.Item>

          <Divider />

          <div className="submit-from-wrap" style={{ display: "inline-flex" }}>

            <span style={{ margin: '5px 10px' }}>订单名称:</span>
            <Form.Item name="name" initialValue="all">

              <Select
                initialvalue="all"
                style={{ width: 120 }}
              >
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
              </Select>
            </Form.Item>

            <span style={{ margin: '5px 10px 5px 30px' }}>报告状态:</span>
            <Form.Item name="report_state" initialValue="all">

              <Select initialvalue="all" style={{ width: 120 }}>
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="可下载">可下载</Select.Option>
                <Select.Option value="生成中">生成中</Select.Option>
              </Select>
            </Form.Item>

            <span style={{ margin: '5px 10px 5px 30px' }}>订单状态:</span>
            <Form.Item name="order_state" initialValue="all">

              <Select initialvalue="全部" style={{ width: 120 }}>
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="已下单">已下单</Select.Option>
                <Select.Option value="未结算">未结算</Select.Option>
                <Select.Option value="已结算">已结算</Select.Option>
                <Select.Option value="已取消">已取消</Select.Option>
              </Select>
            </Form.Item>

            <div className="buttom-wrap">
              <Form.Item>

                <Button
                  className="red-buttom"
                  type="primary"
                  htmlType="submit">查询</Button>
              </Form.Item>
            </div>

          </div>
        </Form>
      </div>
      <Divider />

      {/* ----------------------------------------表格----------------------------------------------------------------------------- */}

      <div className="ob-wrap">
        <span style={{ marginLeft: 10 }}>汇总：{datefrom_string}至{dateto_string}，订单量 {orderall} 条，订单总额共 {moneyall} 元 </span>
      </div>
      <Table columns={columns} dataSource={data} bordered />
      <Divider />
      <div className="blankf"></div>
    </div>
  );
}

export default SelectForm;