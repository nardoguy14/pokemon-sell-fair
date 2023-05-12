import { useState } from 'react';
import axios from "axios";
import {Col, ListGroup, Row, Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { Component } from 'react';


export default class SellTable extends Component {
    constructor(props) {
        super(props)
        const DEFAULT_PERCENTAGE = 0.7

        var sellPrices = Array(this.props.data.length).fill(0)
        const nextSellPrices= sellPrices.map((c, i) => {
            return DEFAULT_PERCENTAGE* this.determinePrice(this.props.data[i]) * this.props.data[i].quantity
        });


        this.state = {
            data: this.props.data,
            percentages: Array(this.props.data.length).fill(0.7),
            sellPrices: nextSellPrices,
            defaultPercentage: DEFAULT_PERCENTAGE
        };

    }

    componentDidMount(){

    }

    changeDefaultPercentage(e) {
        var percentage = e.target.value
        var newPercentages = this.state.percentages.map((c, i) => {
            return percentage
        });
        const nextSellPrices= this.state.sellPrices.map((c, i) => {
            return newPercentages[i] * this.determinePrice(this.state.data[i]) * this.state.data[i].quantity

        });
        this.setState({
            percentages: newPercentages,
            defaultPercentage: percentage,
            sellPrices: nextSellPrices
        })
    }

    changeSellPercentage(row, e) {
        const nextPercentages = this.state.percentages.map((c, i) => {
            if (i === row) {
                return e.target.value;
            } else {
                return c;
            }
        });

        const nextSellPrices= this.state.sellPrices.map((c, i) => {
            if (i === row) {
                return nextPercentages[row] * this.determinePrice(this.state.data[row]) * this.state.data[i].quantity
            } else {
                return c;
            }
        });
        this.setState({
            percentages: nextPercentages,
            sellPrices: nextSellPrices
        })
    }

    determinePrice(card) {
        try {
            if ("normal" in card.tgcplayer.prices && card.tgcplayer.prices.normal !== null) {
                var price = card.tgcplayer.prices.normal.market
            }
            else if("holofoil" in card.tgcplayer.prices && card.tgcplayer.prices.holofoil !== null){
                var price = card.tgcplayer.prices.holofoil.market
            }
            else {
                var price = 999999
            }
        } catch(error){
            console.log("error")
            console.log(card.tgcplayer.prices)
            var price = 999999
        }
        return price
    }

    usdformatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
    });

    makeRows(){
        var rows = []

        this.state.data.forEach((card, index) => {
            var imageUrl = card.images.small
            var cardUrl = card.tgcplayer.url

            var price = this.determinePrice(card)

            rows.push(
                <tr id={index}>
                    <td>
                        <img src={imageUrl}/>
                    </td>
                    <td>
                        <a href={cardUrl} target="_blank">{card.name}</a>
                    </td>
                    <td>
                        {card.quantity}
                    </td>
                    <td>${price}</td>
                    <td>
                        <input id={"percentage-"+index}
                               type="input"
                               value={this.state.percentages[index]}
                               onChange={(e) => this.changeSellPercentage(index, e)}
                        />
                    </td>
                    <td>{this.usdformatter.format(this.state.sellPrices[index])}</td>
                </tr>
            )
        })
        return rows
    }

    render() {
        var totalMarketPrice = 0
        var totalSellPrice = 0
        this.state.data.forEach((card, i) =>{
            var price = this.determinePrice(card)
            totalMarketPrice += price
            totalSellPrice += this.state.percentages[i] * price
        })

        return (
            <div>
                <ListGroup>
                    <ListGroup.Item>
                        <Row>
                            <Col><b>Total Market Price</b>:</Col>
                            <Col>{this.usdformatter.format(totalMarketPrice)}</Col>
                        </Row>




                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col><b>Total Sell Market Price</b>:</Col>
                            <Col>{this.usdformatter.format(totalSellPrice)}</Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name & TCG Link</th>
                        <th>Quantity</th>
                        <th>Market Price</th>
                        <th>
                            Sell Percentage
                            <br/>
                            Default:
                            <input
                                id={"weeeeeee"}
                                type="input"
                                value={this.state.defaultPercentage}
                                onChange={(e) => this.changeDefaultPercentage(e)} />
                        </th>
                        <th>Sell Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.makeRows()}
                    </tbody>
                </Table>
            </div>


        )
    }
}