import React, { useState } from 'react'
import { Table } from '../../../component/export'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { MdEdit, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import dataApi from '../../../Api/DataApi';
import DeleteCard from '../../../component/Global/DeleteCard/DeleteCard';
import './partieTable.css'

function PartieTable() {
    const columns = [
        {
            header: 'PartieCode',
            accessorKey: 'PartieCode',
            footer: 'PartieCode'
        },
        {
            header: 'Name',
            accessorKey: 'Name',
            footer: 'Name'
        },
        {
            header: 'type',
            accessorKey: 'type',
            footer: 'type'
        },
        {
            header: 'contactNo',
            accessorKey: 'contactNo',
            footer: 'contactNo'
        },
        {
            header: 'Address',
            accessorKey: 'Address',
            footer: 'Address'
        },
        {
            header: 'Update',
            cell: ({ row }) => {
                return (
                    <Link to={`/dashboard/add-partie?id=${row.original._id}`}><MdEdit /></Link>
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
        heading: 'Parties Table'
    }

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
        Fun: dataApi.DeletePartie.bind(dataApi),
        values: deleteItemId,
        extraFnc: () => {
            setDeleteItemId(null);
            setShowDeleteCard(false);
            data.reloadFunction()
        }
    }

    return (
        <div className='PartieTable'>
            <div className='partie-Table'>
                <Table data={data?.Data.parties || []} columns={columns} extra={extra} />
            </div>
            <div className='partie-dlt-card'>
                {
                    showDeleteCard ? <div className='dlt-card'>
                        <DeleteCard DeleteFnc={DeleteFnc} onClose={handleCloseDeleteCard} dltTitle={'item'} />
                    </div> : null
                }
            </div>
        </div>


    )
}

export default PartieTable
