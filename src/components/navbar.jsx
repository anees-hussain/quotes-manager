import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import db from "../firebase";
import Image from "../favicon.ico";
import { Link } from "react-router-dom";

let dbData = [];

class Navbar extends Component {
  state = {
    show: false,
    quoteInput: "",
    authorInput: "",
    selectedCategory: "",
    categories: [],
  };

  componentDidMount() {
    this.state.categories = [];
    this.getCategories();
  }

  getCategories = () => {
    db.ref("/quotes/").on("value", (snapshot) => {
      let keys = Object.entries(snapshot.val());
      dbData = [];
      for (let i = 0; i < keys.length; i++) {
        dbData.push(keys[i][1]);
      }
      this.setState({ categories: dbData });
    });
  };

  quoteInput = (e) => {
    let input = e.target.value;
    this.setState({ quoteInput: input });
  };
  authorInput = (e) => {
    let input = e.target.value;
    this.setState({ authorInput: input });
  };

  handleShow = () => this.setState({ show: true });

  handleSave = () => {
    let quoteObj = {
      id: Math.floor(Math.random() * 999999),
      text: this.state.quoteInput,
      author: this.state.authorInput,
      category: this.state.selectedCategory,
    };

    db.ref(
      `/quotes/${this.state.selectedCategory}/quotesData/${quoteObj.id}`
    ).set(quoteObj);
    this.setState({ show: false });
  };

  handleSelect = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link style={{ textDecoration: "none" }} to="/">
            <a className="navbar-brand" href="#">
              <img
                src={Image}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt=""
              />
              uotes Manager
            </a>
          </Link>
          <ul className="navbar-nav">
            <Link style={{ textDecoration: "none" }} to="/">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Dashboard <span className="sr-only">(current)</span>
                </a>
              </li>
            </Link>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={this.handleShow}>
                Add a Quote
              </a>
            </li>
            <Link style={{ textDecoration: "none" }} to="/add-a-category">
              <li className="nav-item">
                <a className="nav-link">Add a Category</a>
              </li>
            </Link>
          </ul>
        </nav>

        <div style={{ padding: "2%" }}>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Quote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div class="form-group">
                  <label htmlFor="quote">Quote</label>
                  <textarea
                    rows="4"
                    type="text"
                    class="form-control"
                    id="quote"
                    onChange={this.quoteInput}
                  />
                </div>
                <div class="form-group">
                  <label htmlFor="author">Author</label>
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    onChange={this.authorInput}
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">
                    Select a Category:
                  </label>
                  <select
                    class="form-control"
                    id="exampleFormControlSelect1"
                    value={this.state.selectedCategory}
                    onChange={this.handleSelect}
                  >
                    <option></option>
                    {this.state.categories.map((m) => (
                      <option key={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleSave}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

export default Navbar;
