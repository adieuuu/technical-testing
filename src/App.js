import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Dialog } from 'primereact/dialog'
import { CustomerService } from './CustomerService';
import './DataTableDemo.css';

const App = () => {
    const [customers, setCustomers] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [filters, setFilters] = useState('');
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [listData, setListData] = useState([])
    const [submitted, setSubmitted] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const [deletePopUp, setDeletePopUp] = useState(false)
    const [add, setAdd] = useState(false)
    const [updateDB, setUpdateDB] = useState(false)
    const [input, setInput] = useState({
      id: '',
      name: '',
      nip: null,
      noTelp: '',
      email: '',
      no: null
    })
    const { id, name, nip, noTelp, email, no } = input
    console.log(add)

    useEffect(() => {
      axios.get('http://localhost:8000/listUser')
      .then((res) => {
        setListData(res.data)
        setLoading(false)
        setUpdateDB(false)
      })
      .catch((err) => {
        console.log(err)
      })
    }, [updateDB]);

    const renderHeader = () => {
        return (
            <div className="p-d-flex p-jc-between p-ai-center">
                <h5 className="p-m-0">List User</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setFilters(e.target.value)} placeholder="Search..." />
                </span>
                <Button type="button" icon="pi pi-plus" style={{backgroundColor: 'skyblue'}} onClick={() => addData()}></Button>
            </div>
        )
    }

    const updateBodyTemplate = (rowData) => {
        return <Button type="button" icon="pi pi-pencil" onClick={() => updateData(rowData)}></Button>;
    }

    const deleteBodyTemplate = (rowData) => {
      return <Button type="button" icon="pi pi-trash" style={{backgroundColor: 'red'}} onClick={() => deleteUser(rowData)}></Button>;
  }

  const addData = () => {
    setPopUp(true)
    setAdd(true)
    setInput(input => ({...input, ['id']: listData[listData.length - 1].id + 1}))
  }

  const updateData = (data) => {
    setPopUp(true)
    setInput(input => ({...input, ['id']: data.id}))
    setInput(input => ({...input, ['name']: data.name}))
    setInput(input => ({...input, ['nip']: data.nip}))
    setInput(input => ({...input, ['noTelp']: data.noTelp}))
    setInput(input => ({...input, ['email']: data.email}))
  }

  const deleteUser = (data) => {
    setDeletePopUp(true)
    setInput(input => ({...input, ['id']: data.id}))
    setInput(input => ({...input, ['name']: data.name}))
    setInput(input => ({...input, ['nip']: data.nip}))
    setInput(input => ({...input, ['noTelp']: data.noTelp}))
    setInput(input => ({...input, ['email']: data.email}))
  }

  const hidePopUp = () => {
    setInput(input => ({...input, ['id']: ''}))
    setInput(input => ({...input, ['name']: ''}))
    setInput(input => ({...input, ['nip']: null}))
    setInput(input => ({...input, ['noTelp']: ''}))
    setInput(input => ({...input, ['email']: ''}))
    setSubmitted(false);
    setPopUp(false);
    setDeletePopUp(false)
    setAdd(false)
  }

  const addUser = () => {
    axios.post(`http://localhost:8000/listUser`,input)
    .then(() => {
      setInput(input => ({...input, ['id']: ''}))
      setInput(input => ({...input, ['name']: ''}))
      setInput(input => ({...input, ['nip']: null}))
      setInput(input => ({...input, ['noTelp']: ''}))
      setInput(input => ({...input, ['email']: ''}))
      setPopUp(false);
      setUpdateDB(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const saveData = () => {
    axios.put(`http://localhost:8000/listUser/${id}`,input)
    .then(() => {
      setInput(input => ({...input, ['id']: ''}))
      setInput(input => ({...input, ['name']: ''}))
      setInput(input => ({...input, ['nip']: null}))
      setInput(input => ({...input, ['noTelp']: ''}))
      setInput(input => ({...input, ['email']: ''}))
      setPopUp(false);
      setUpdateDB(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const deleteData = () => {
    axios.delete(`http://localhost:8000/listUser/${id}`)
    .then(() => {
      setInput(input => ({...input, ['id']: ''}))
      setInput(input => ({...input, ['name']: ''}))
      setInput(input => ({...input, ['nip']: null}))
      setInput(input => ({...input, ['noTelp']: ''}))
      setInput(input => ({...input, ['email']: ''}))
      setDeletePopUp(false);
      setUpdateDB(true)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const onHandleChange = (e, name) => {
    const { value } = e.target
    setInput(input => ({...input, [name]: value}))
  }

  const popUpFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidePopUp} />
        <Button label={add ? "Add" : "Update"} icon="pi pi-check" className="p-button-text" onClick={add ? addUser : saveData} />
    </React.Fragment>
  )

  const deletePopUpFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidePopUp} />
        <Button label="Delete" icon="pi pi-check" className="p-button-text" onClick={deleteData} />
    </React.Fragment>
  )

  const header = renderHeader();

  const rowIndexTemplate = (rowData, props) => {
    let index = parseInt(props.rowIndex + 1, 10);
    return (
      <React.Fragment>
        <span>{index}</span>
      </React.Fragment>
    );
  };

  const columns = [
    {
      field: "index",
      header: "No.",
      body: rowIndexTemplate,
      style: { width: "3rem" }
    },
  ];

  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        body={col.body}
        style={col.style}
      />
    );
  });

    return (
        <div className="datatable-doc-demo">
            <div className="card">
                <DataTable 
                  value={listData} 
                  dataKey="id" 
                  paginator 
                  rows={5} 
                  paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                  globalFilter={filters} 
                  header={header} 
                  responsiveLayout="scroll"
                  emptyMessage="No customers found."
                >
                  {dynamicColumns}
                  <Column field="name" header="Nama" style={{ minWidth: '14rem' }} />
                  <Column field="nip" header="NIP" style={{ minWidth: '14rem' }} />
                  <Column field="noTelp" header="No. Telp" style={{ minWidth: '14rem' }} />
                  <Column field="email" header="Email" style={{ minWidth: '14rem' }} />
                  <Column headerStyle={{ width: '1rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={updateBodyTemplate} />
                  <Column headerStyle={{ width: '1rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={deleteBodyTemplate} />
                </DataTable>
            </div>

            <Dialog visible={popUp} style={{ width: '450px' }} header={add ? "Add User" : "Update User"} modal className="p-fluid" footer={popUpFooter} onHide={hidePopUp}>
                <div className="p-field">
                    <label htmlFor="id">ID</label>
                    <InputText id="id" value={id} disabled={true} />
                </div>
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={name} onChange={(e) => onHandleChange(e, 'name')} required autoFocus />
                </div>
                <div className="p-field">
                    <label htmlFor="nip">NIP</label>
                    <InputText id="nip" value={nip} onChange={(e) => onHandleChange(e, 'nip')} required />
                </div>
                <div className="p-field">
                    <label htmlFor="noTelp">No. Telp</label>
                    <InputText id="noTelp" value={noTelp} onChange={(e) => onHandleChange(e, 'noTelp')} required />
                </div>
                <div className="p-field">
                    <label htmlFor="email">Email</label>
                    <InputText id="email" value={email} onChange={(e) => onHandleChange(e, 'email')} required />
                </div>
            </Dialog>

            <Dialog visible={deletePopUp} style={{ width: '450px' }} header="Confirm" modal footer={deletePopUpFooter} onHide={hidePopUp}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {<span>Are you sure you want to delete <b>{name}</b> data?</span>}
                </div>
            </Dialog>
        </div>
    );
}
                
export default App;