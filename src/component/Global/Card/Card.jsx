import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

function Card({ Data }) {
    return (
        <div class="col-md-3 col-xl-3">
            <Link to={Data.link}>
                <div className={`card ${Data.wantRed ? 'bg-c-red' : 'bg-c-blue'} order-card`}>
                    < div class="card-block">
                        <h6 class="m-b-20">{Data.title}</h6>
                        <h2 class="text-right">{Data.icon}<h2 class="f-right">{Data.number}</h2></h2>
                    </div>
                </div>
            </Link>
        </div >

    )
}

export default Card
