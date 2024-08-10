import React from 'react'
import { Table } from '../../../component/export'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useState } from 'react'
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import dataApi from '../../../Api/DataApi';
import DeleteCard from '../../../component/Global/DeleteCard/DeleteCard';
import './itemtable.css'
import {Button} from '../../../component/export';
import ItemMaster from '../ItemMaster/ItemMaster';
import {SideShow} from '../../../component/export';
function ItemTable() {
    const columns = [
        {
            header: 'code',
            accessorKey: 'code',
            footer: 'code'
        },
        {
            header: 'itemName',
            accessorKey: 'itemName',
            footer: 'itemName'
        },
        {
            header: 'unit',
            accessorKey: 'unit',
            footer: 'unit'
        },
        {
            header: 'category',
            accessorKey: 'category',
            footer: 'category'
        },
        {
            header: 'quantity',
            accessorKey: 'quantity',
            footer: 'quantity'
        },
        {
            header: 'Update',
            cell: ({ row }) => {
                return (
                    <Link to={`/dashboard/item-master?id=${row.original._id}`}><MdEdit /></Link>
                )
            }
        },
        {
            header: 'Delete',
            cell: ({ row }) => {
                return (
                    <button onClick={() => handleDeleteClick(row.original._id)}>
                        <MdDelete />
                    </button>
                );
            }
        }
    ]
    const data = useDashContext()
    const [pageNo, SetPageNo] = useState(1)
    const extra = {
        pageNo,
        SetPageNo,
        heading: 'item Table'
    }
    
    const [WhatToShow, SetWhatToShow] = useState("");
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteItemId(id);
        setShowDeleteCard(true);
    };

    const handleCloseDeleteCard = () => {
        setShowDeleteCard(false);
        setDeleteItemId(null);
    };

    const DeleteFnc = {
        Fun: dataApi.DeleteItem.bind(dataApi),
        values: deleteItemId,
        extraFnc: () => {
            setDeleteItemId(null);
            setShowDeleteCard(false);
            data.reloadFunction()
        }
    }
    return (
       <div className="item-table-container">
        
         <div className="add-new-item-btn mb-3">
       <Button title={"Add new"} onclick={()=>{
        SetWhatToShow("item-entry");
       }}/>
       </div>
         <div className='itemtable'>
            <div className='item-table'>
                <Table data={data?.Data?.items || []} columns={columns} extra={extra} />
            </div>
            {
                showDeleteCard ? <div className='dlt-card'>
                    <DeleteCard DeleteFnc={DeleteFnc} onClose={handleCloseDeleteCard} dltTitle={'item'} />
                </div> : null
            }
        </div>
        <div className="partie-entry">
        <SideShow
                  whatName={"item-entry"}
                  CMP1={<ItemMaster />}
                  WhatToShow={WhatToShow}
                  SetWhatToShow={SetWhatToShow}
                />
        </div>
       </div>
    )
}

export default ItemTable
