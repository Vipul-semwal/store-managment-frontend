import React from 'react'
import { useDashContext } from '../../../Hooks/ContextDashboard'
import { Card } from '../../../component/export'
import { MdStorefront, MdPeopleAlt } from "react-icons/md";
import { DiBitbucket } from "react-icons/di";
import { array, number } from 'yup';
import { Link } from 'react-router-dom';


function DashBoard() {
    const data = useDashContext()
    console.log('dataaa', data)
    const findOutOfStock = (data) => {
        let num = 0;
        data.forEach(element => {
            if (element.quantity === 0) {
                num += 1
            }

        });

        return num
    }
    const cards = [
        { title: "Items in Store", number: data?.Data?.items?.length || 0, icon: <MdStorefront />, link: '/dashboard/item-table' },
        { title: "parties", number: data?.Data?.parties?.length || 0, icon: <MdPeopleAlt />, link: '/dashboard/partie-table' },
        { title: "Out of Stock", icon: <DiBitbucket />, number: findOutOfStock(data?.Data?.items || []), wantRed: true, link: '/dashboard/out-of-stock' }
    ]
    return (
        <div className='container'>
            <div className='row'>
                {cards.map((i, index) => {
                    return (
                        <Card Data={i} key={index} />
                    )
                })}
            </div>
        </div>
    )
}

export default DashBoard
