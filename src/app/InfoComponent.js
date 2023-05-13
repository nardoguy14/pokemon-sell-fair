import {Component} from "react";
import {Accordion} from "react-bootstrap";
import Button from "react-bootstrap/Button";


export default class InfoComponent extends Component {
    constructor(props) {
        super(props)
    }

    clickLink = e => {
        document.getElementById("downloadLink").click()
    }
    render() {
        return (
            <Accordion>

                <Accordion.Item eventKey="0">
                    <Accordion.Header>Purpose</Accordion.Header>
                    <Accordion.Body>
                        This app should be used in conjuction with TGC Dragonshield app.
                        <br/><br/>
                        The flow should be to create an inventory via the app then export it out
                        as a csv file.
                        <br/><br/>
                        Utilizing the csv file you are able to provide it to this
                        application to generate a set of prices that the cards would be sold out
                        given a discount that shops usually take.
                        <br/><br/>
                        For instance, if a one dollar
                        card was to be sold and the shop gives at highest 60% the value of the card
                        this app would tell us the revenue we wouldd receive from that the card.
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Example CSV File</Accordion.Header>
                    <Accordion.Body>
                        <Button onClick={this.clickLink}> Download File</Button>
                        <a id="downloadLink" style={{display:"none"}} href={"https://www.dropbox.com/s/goiqg22coh214ix/example.csv?dl=1"} download>Download file</a>
                    </Accordion.Body>
                </Accordion.Item>

            </Accordion>
        )
    }
}