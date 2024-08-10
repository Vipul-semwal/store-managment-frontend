import React, { useState } from 'react'
import { Table } from '../../../component/export'
import dataApi from '../../../Api/DataApi'
import { Filter } from '../../../component/export'
import { Makeoptions } from '../../../utility/Makeoptions'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { useMemo, useEffect, useCallback } from 'react'
import useFetchdata from '../../../Hooks/useFetchData'
import qs from 'qs'
import {Button} from '../../../component/export'
import PurchaseRegister from '../PurchaseRegister/PurchaseRegister'
import {SideShow} from '../../../component/export'
import './PurchaseTable.css';

function PurchaseTable() {
    const { loading, res, MakeApiReq, Message } = useFetchdata()
    const [ShouldAppend, SetShouldAppend] = useState(false)
    const [RenderCount, SetRenderCount] = useState(0)
    const [Data, SetData] = useState({
        itemName: '',
        partyName: '',
        type: '',
        // createdAt: new Date(),
        skip: 0,
        isFilter: "false",

    })

    // console.log('res', res)
    useEffect(() => {
        SetRenderCount((prev) => {
            // console.log('see', prev)
            return prev + 1
        })
        MakeApiReq(dataApi.GetPurchaseData.bind(dataApi), qs.stringify(Data), ShouldAppend)
    }, [Data])
    const data = useDashContext()
    const partyName = useMemo(() => Makeoptions(data?.Data.parties || [], 'Name'), [data.Data.parties]);
    const itemName = useMemo(() => Makeoptions(data?.Data.items || [], 'itemName'), [data.Data.items]);

    const inputs = [
        {
            inputType: 'select',
            name: "partyName",
            options: partyName

        },
        {
            inputType: 'select',
            name: "itemName",
            options: itemName

        },
        {
            inputType: 'select',
            name: "type",
            options: [
                { label: "Credit", value: "Credit" },
                { label: "Cash", value: "Cash" }
            ]

        }
    ]

    const columns = [
        {
            header: 'purchaseNo',
            accessorKey: 'purchaseNo',
            footer: 'purchaseNo'
        },
        {
            header: 'partyName',
            accessorKey: 'partyName',
            footer: 'partyName'
        },
        {
            header: 'itemName',
            accessorKey: 'itemName',
            footer: 'itemName'
        },
        {
            header: 'type',
            accessorKey: 'type',
            footer: 'type'
        },
        {
            header: 'rate',
            accessorKey: 'rate',
            footer: 'rate'
        },
        {
            header: 'quantity',
            accessorKey: 'quantity',
            footer: 'quantity'
        },
        {
            header: 'totalAmount',
            accessorKey: 'totalAmount',
            footer: 'totalAmount'
        }
    ]
    
    const [WhatToShow, SetWhatToShow] = useState("");
    const [pageNo, SetPageNo] = useState(1)
    const extra = {
        pageNo,
        SetPageNo,
        heading: 'Purchase Register',
        btnLogic: true,
        onclick: () => {
            SetShouldAppend(true)
            SetData((prev) => {
                return {
                    ...prev,
                    skip: prev.skip + 10
                }
            })

        }
        ,
        loader: loading,
        title: "Load more",
        Message,

    }

    if (loading && RenderCount <= 2) {
        return (
            <div className='text-danger text-center'>
                loading...
            </div>
        )
    }

    return (
      <div className="purchase-table-container">
          <div className={`purhchase-table-wraper ${WhatToShow?'blurred':""}`}>
            <Filter inputs={inputs} Data={Data} Setter={SetData} ShouldAppend={SetShouldAppend} />
            <div className="add-new-purchase-entry-btn mb-3">
       <Button title={"Add new"} onclick={()=>{
        SetWhatToShow("Purchase-entry");
       }}/>
       </div>
            <Table data={res} columns={columns} extra={extra} />
        </div>
        <div className="purchase-entry">
        <SideShow
                  whatName={"Purchase-entry"}
                  CMP1={<PurchaseRegister />}
                  WhatToShow={WhatToShow}
                  SetWhatToShow={SetWhatToShow}
                />
        </div>
      </div>
    )
}

export default PurchaseTable
