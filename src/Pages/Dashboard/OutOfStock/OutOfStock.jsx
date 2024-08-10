import React from 'react'
import { Table } from '../../../component/export'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useState } from 'react'

function OutOfStock() {
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
        }
    ]
    const data = useDashContext()
    const FindOutOfStock = (data) => {
        const newarr = []
        data.forEach(element => {
            if (element.quantity === 0) {
                newarr.push(element)
            }

        });
        return newarr
    }
    // console.log('data', data)
    const [pageNo, SetPageNo] = useState(1)
    const extra = {
        pageNo,
        SetPageNo,
        heading: 'Out of Stock'
    }
    return (
        <div>
            <Table data={FindOutOfStock(data?.Data?.items || [])} columns={columns} extra={extra} />
        </div>
    )
}

export default OutOfStock
