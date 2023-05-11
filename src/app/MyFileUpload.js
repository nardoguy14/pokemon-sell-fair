import { useState } from 'react';
import axios from "axios";
import {Col, Row, Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component } from 'react';


export default class SellTable extends Component {
    constructor(props) {
        super(props)
        this.state = {data: this.props.data};

    }

    componentDidMount(){

    }

    makeRows(){
        var rows = []
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 4,
        });

        this.state.data.forEach(card => {
                var imageUrl = card.images.small
                var cardUrl = card.tgcplayer.url





                try {
                    if ("normal" in card.tgcplayer.prices && card.tgcplayer.prices.normal !== null) {
                        var price = card.tgcplayer.prices.normal.market
                    }
                    else if("holofoil" in card.tgcplayer.prices && card.tgcplayer.prices.holofoil !== null){
                        var price = card.tgcplayer.prices.holofoil.market
                    }
                    else {
                        console.log("ERRRRORRR")
                        console.log(card.tgcplayer.prices)
                        var price = 999999
                    }
                } catch(error){
                    console.log("ERRRRORRR")
                    console.log(card.tgcplayer.prices)
                    var price = 999999
                }


                rows.push(
                    <tr>
                        <td>
                            <img src={imageUrl}/>
                        </td>
                        <td>
                            <a href={cardUrl}>{card.name}</a>
                        </td>
                        <td>${price}</td>
                        <td>{0.7}%</td>
                        <td>{formatter.format(price * 0.7)}</td>
                    </tr>
                )
            }
        )
        return rows
    }

    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name & TCG Link</th>
                    <th>Market Price</th>
                    <th>Sell Percentage</th>
                    <th>Sell Price</th>
                </tr>
                </thead>
                <tbody>
                {this.makeRows()}
                </tbody>
            </Table>
        )
    }
}