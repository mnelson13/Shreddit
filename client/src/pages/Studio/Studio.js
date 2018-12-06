import React, { Component } from "react";
import Banner from "../../components/Banner";
import ShredPlayer from "../../components/ShredPlayer";
import API from "../../utils/API";
import "./Studio.css";


class Studio extends Component {

    startingMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
    // TODO: Update this.state.matrix when user changes shredplayer component

    state = {
        user_id: "user",
        username: "",
        matrix: this.startingMatrix

    }

    //BinaryMath - encoding strings
    encoding = () => {
        let shortenedMatrix = [];

        for (let i = 0; i < this.startingMatrix.length; i++) {
            var matrixString = "";
            for (let j = 0; j < this.startingMatrix[i].length; j++) {
                if (this.startingMatrix[i][j]) {matrixString += "1"}
                else {matrixString += "0"}
            }
            console.log(matrixString);
            shortenedMatrix.push(parseInt(matrixString, 2));
        }
        return shortenedMatrix;
    }

    componentDidMount() {
        const username = localStorage.getItem("username");
        this.setState({username: username})

    }

    walkieTalkie = matrix => {
        this.setState({matrix: matrix});
    }

    save = () => {
        let shortenedMatrix = this.encoding();
        console.log(shortenedMatrix);
        // before saving to db, make sure saving current matrix
        API.saveShred({
            // user_id: this.state.user_id,

            username: localStorage.getItem("username"),
            matrix: this.state.matrix
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    clear = () => {
        // Set state matrix to 0 matrix
        this.setState({matrix: this.startingMatrix});
    }

    render(){
        return (
            <div>
                <div>
                    <Banner />
                </div>

                <div className="row container">
                    <div className="col s12">
                        <div className="row">
                            <h2 className="col s12">Your Studio</h2>
                        </div>

                        <div className="z-depth-4">
                            <div className="row">
                                <div className="col s1"></div>
                                <div className="col s10 shred">
                                    <ShredPlayer
                                        walkieTalkie={this.walkieTalkie}
                                        matrix={this.state.matrix}
                                        id={this.state.user_id}
                                    />
                                </div>
                                <div className="col s1"></div>
                            </div>

                            <div className="row">
                                <div className="col s12 center-align">
                                    <button class="btn waves-effect waves-light studiobtn" onClick={this.save}>Save
                                        <i class="material-icons right">save</i>
                                    </button>
                                    <button class="btn waves-effect waves-light studiobtn" onClick={this.clear}>Clear
                                        <i class="material-icons right">delete</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Studio;