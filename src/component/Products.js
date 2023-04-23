import React, {useEffect, useState, useRef} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from "axios"

function Products(props) {
    let token=localStorage.getItem('token');
    const[products, setProducts]=useState([]);


    useEffect(()=>{
        //bula hammasi 
        let data={
            size:10,
            page:1
        };

        let newProduct=[]; //bu variable tartib raqam uchun yaratvoldik

        axios.get(`https://toko.ox-sys.com/variations`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' ,
                'Accept':'application/json'
            },
            data: data
        }).then((res)=>{
            //console.log(res)

            //bu pastdagi code tartib raqamini chaqirish uchun qildik, va teppada biza newProduct=[]; ochvoldik
            let arr=res.data?.items;

            if(arr.length>0){
              arr.forEach((item,index)=>{

                let newObj={
                  ...item,
                  index:index+1
                };
                newProduct.push(newObj)
              });
              console.log(newProduct)
            }

            setProducts(newProduct)
            //console.log(products)
        })
        //mana shundan keyin console =>Network variations=> Request Headers qarab quy
        
    }, [])


    const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Tr',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      width: '20%',
      ...getColumnSearchProps('supplier'),
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      ...getColumnSearchProps('unit'),
      sorter: (a, b) => a.unit.length - b.unit.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'lastUpdateTime',
      dataIndex: 'lastUpdateTime',
      key: 'lastUpdateTime',
      width: '20%',
    }
  ];

    return (
        <Table columns={columns} dataSource={products} rowKey="id"/> //dataSource bu map qivoradigan chizadigani, va rowkey esa uniqe key prop uchun yaratilgan variable
    );
}

export default Products;