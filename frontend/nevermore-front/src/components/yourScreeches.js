import React from 'react';
import { Timeline, Tweet } from 'react-twitter-widgets'
import Button from 'react-bootstrap/Button';


function yourScreeches() {
    return (
        <div className="explore">
            <h1>Your screeches: </h1>
            <Tweet tweetId="1316104674290790400" />
            <Button variant="outline-danger">Delete in 5 minutes</Button>
            <Button variant="outline-success">Add 5 minutes</Button>{' '}
            <Button variant="outline-danger">Delete in 1 hour</Button>
            <Button variant="outline-success">Add 1 hour</Button>{' '}
            <p>
                <h3>Deleting in: 5:00</h3>
            </p>


        </div>
    );
}

export default yourScreeches;