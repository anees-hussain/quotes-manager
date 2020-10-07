import React, { Component } from "react";
import db from "../firebase";
import Navbar from "./navbar";

let dbData = [];

class Category extends Component {
  state = {
    category: "",
    data: [],
  };

  componentDidMount() {
    this.state.data = [];
    this.getQuotes();
  }

  getQuotes = () => {
    db.ref("/quotes/").on("value", (snapshot) => {
      let quotesArray = snapshot.val();
      let entries = Object.entries(quotesArray);
      dbData = [];
      for (let i = 0; i < entries.length; i++) {
        dbData.push(entries[i][1]);
      }
      this.setState({ data: dbData });
    });
  };

  categoryInput = (e) => {
    let input = e.target.value;
    this.setState({ category: input });
  };

  handleDelete = (category) => {
    db.ref(`/quotes/${category.name}`).remove();
    dbData = [];
    this.getQuotes();
  };

  addCategory = () => {
    db.ref("/quotes/" + this.state.category).set({
      id: Math.floor(Math.random() * 999999),
      name: this.state.category,
    });
  };

  render() {
    return (
      <>
        <Navbar />
        <div style={{ padding: "2%" }}>
          <p>Add a New Category:</p>
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Category"
                  onChange={this.categoryInput}
                />
              </div>
              <div class="col">
                <button
                  type="button"
                  class="btn btn-primary sm"
                  onClick={this.addCategory}
                >
                  Add
                </button>
              </div>
            </div>
          </form>
          <p>There are {this.state.data.length} categories available.</p>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Number of Quotes</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((category) => (
                <tr key={category.id}>
                  <td className="text-break">{category.name}</td>
                  <td className="text-break">
                    {category.quotesData
                      ? Object.keys(category.quotesData).length
                      : 0}
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Category;
