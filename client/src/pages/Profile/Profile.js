import React, { Component } from "react";
import "./Profile.css"
//import UserBio from "../../components/UserBio";
import Shred from "../../components/Shred";
import Banner from "../../components/Banner";
import API from "../../utils/API"

class Profile extends Component {

    state = {
        username: "",
        joinDate: "11/30/18",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rutrum sed nulla et rutrum. Phasellus interdum ex et lacus pellentesque sodales. Fusce sollicitudin suscipit ligula sit amet dictum. Donec sagittis ligula ut sapien rhoncus interdum. In id purus vel tellus molestie consequat. Aenean commodo ante ac tincidunt tincidunt. Quisque diam odio, elementum sed placerat in, rhoncus sit amet odio. Sed et turpis vel augue fermentum bibendum. Nam congue tortor vel enim molestie vestibulum.",
        shreds: [
            //{id: 1, shred: "Shred1", votes: 120}, {id: 2, shred: "Shred2", votes: 30}, {id: 3, shred:"Shred3", votes: 80}
        ],
    }

    componentDidMount(){
        const username = localStorage.getItem("username");
        this.getUserShreds(username);
        this.setState({username: username})
    }

    getUserShreds = (username) => {
        API.getUserShreds(username)
            .then(res => {
                console.log(res.data);
                this.setState({shreds: res.data})
            })
            .catch(err => console.log(err));
    }

    vote = (id, incdec) => {
        let user = this.state.username

        let data = {
            incdec: incdec,
            username: user
        }

        API.vote(data, id)
            .then(this.getAllShreds())
            .catch(err => console.log(err));
    }

    walkieTalkie = matrix => {
        this.setState({matrix: matrix});
    }

    render(){
        return (
            
            <div>
                <div>
                    <Banner/>
                </div>

                <div className="container">
                    <h2>{this.state.username}'s Shreds</h2>
                    <div className="row">
                        <div className="col s12">
                        {this.state.shreds.length ? (
                            this.state.shreds.map(shred => (
                                <Shred
                                    key={shred._id}
                                    id={shred._id}
                                    user_id={shred._id}
                                    shred_id={shred._id}
                                    votes={shred.voteCount}
                                    vote={this.vote}
                                    title={this.title}
                                    walkieTalkie={this.walkieTalkie}
                                    matrix={shred.matrix}
                                />
                            ))
                        ) : (
                            <h3>You do not have any Shreds yet!</h3>
                        )}
                        
                        </div>
 
                        {/* <UserBio
                        name={this.state.name}
                        joinDate={this.state.joinDate}
                        bio={this.state.bio}
                        /> */}

                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;

