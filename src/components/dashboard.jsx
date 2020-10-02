import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import db from "../firebase";
import Image from "../favicon.ico";

let dbData = [];

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
    db.ref("/quotes/").on("value", (snapshot) => {
      let quotesArray = snapshot.val();
      let entries = Object.entries(quotesArray);
      for (let i = 0; i < entries.length; i++) {
        dbData.push(entries[i][1]);
      }
      this.setState({ data: dbData });
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
  categoryInput = (e) => {
    let input = e.target.value;
    this.setState({ categoryInput: input });
  };

  handleShow = () => this.setState({ show: true });

  handleSave = () => {
    let quoteObj = {
      id: Math.floor(Math.random() * 999999),
      text: this.state.quoteInput,
      author: this.state.authorInput,
      category: this.state.categoryInput,
    };

    db.ref("/quotes/" + quoteObj.id).set(quoteObj);
    this.setState({ show: false });
  };

  handleClose = () => this.setState({ show: false });

  handleDelete = ({ id }) => {
    db.ref(`/quotes/${id}`).remove();
    dbData = [];
    this.getQuotes();
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            <img
              src={Image}
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            Quotes Manager
          </a>
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={this.handleShow}>
                    Add a Quote
                  </a>
                </li>
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
                  <label for="quote">Quote</label>
                  <textarea
                    rows="4"
                    type="text"
                    class="form-control"
                    id="quote"
                    onChange={this.quoteInput}
                  />
                </div>
                <div class="form-group">
                  <label for="author">Author</label>
                  <input
                    type="text"
                    class="form-control"
                    id="author"
                    onChange={this.authorInput}
                  />
                </div>
                <div class="form-group">
                  <label for="Category">Category</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    onChange={this.categoryInput}
                  />
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
                      class="btn btn-danger btn-sm"
                      onClick={() => this.handleDelete(quote)}
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

export default Dashboard;
