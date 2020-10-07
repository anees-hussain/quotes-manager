import React, { Component } from "react";
import db from "../firebase";
import Navbar from "./navbar";

let dbData = [];
let categoryArr = [];
let quotesArr = [];

class Dashboard extends Component {
  state = {
    show: false,
    quoteInput: "",
    authorInput: "",
    categoryInput: "",
    data: [],
  };

  componentDidMount() {
    this.state.data = [];
    this.getQuotes();
  }

  getQuotes = () => {
    categoryArr = [];
    quotesArr = [];
    db.ref("/quotes/").on("value", (snapshot) => {
      // Getting Categories
      let categoryObj = snapshot.val();
      for (let key in categoryObj) {
        categoryArr.push(key);
      }
      // Getting quotes from categories
      for (let index = 0; index < categoryArr.length; index++) {
        db.ref(`/quotes/${categoryArr[index]}/quotesData`).on(
          "value",
          (snap) => {
            let quotesArray = snap.val();

            if (quotesArray == null) {
              return;
            }

            let entries = Object.entries(quotesArray);
            for (let i = 0; i < entries.length; i++) {
              quotesArr.push(entries[i][1]);
            }
          }
        );
      }
      this.setState({ data: quotesArr });
    });
  };

  handleDelete = ({ id, category }) => {
    db.ref(`/quotes/${category}/quotesData/${id}`).remove();
    dbData = [];
    this.getQuotes();
  };

  render() {
    return (
      <>
        <Navbar/>
        <p>There are {this.state.data.length} quotes.</p>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Quote</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((quote) => (
              <tr key={quote.id}>
                <td className="text-break">{quote.text}</td>
                <td className="text-break">{quote.author}</td>
                <td className="text-break">{quote.category}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(quote)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Dashboard;
