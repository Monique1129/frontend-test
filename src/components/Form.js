import React, { Component } from "react";
import Counter from "./Counter";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      counterName: "",
      counters: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddCounter = this.handleAddCounter.bind(this);
  }

  handleInputChange(e) {
    e.preventDefault();

    this.setState({ counterName: e.target.value });
  }

  handleAddCounter(e) {
    e.preventDefault();

    this.setState({
      counterName: "",
      counters: [
        ...this.state.counters,
        {
          name: this.state.counterName,
          count: 0
        }
      ]
    });
  }

  handleDeleteCounter(counter) {
    this.setState({
      counters: this.state.counters.filter(c => c !== counter)
    });
  }

  handleCountChange(counter, val) {
    let updatedCounter = this.updateCount(counter, val);
    this.setState({
      counters: this.state.counters.map(
        c => (c === counter ? Object.assign({}, c, updatedCounter) : c)
      )
    });
  }

  updateCount(counter, val) {
    counter.count += val;
    return counter;
  }

  render() {
    const { counterName, counters } = this.state;
    const calculateTotal = counters.reduce(
      (total, curr) => total + curr.count,
      0
    );
    return (
      <div>
        <div>
          <form>
            <label htmlFor="counterName">Counter Name: </label>
            <input
              type="text"
              id="counterName"
              name="counterName"
              value={counterName}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleAddCounter}>Add Counter</button>
          </form>
        </div>
        <div>
          <p>Counters:</p>
          {counters.map(counter => (
            <div
              style={{
                display: "flex"
              }}
            >
              <button onClick={() => this.handleDeleteCounter(counter)}>
                X
              </button>
              <li>{counter.name}</li>
              <button onClick={() => this.handleCountChange(counter, 1)}>
                Inc!
              </button>
              <p>{counter.count}</p>
              <button onClick={() => this.handleCountChange(counter, -1)}>
                Dec!
              </button>
            </div>
          ))}
        </div>
        <br />
        <div>Total Count: {calculateTotal}</div>
      </div>
    );
  }
}

export default Form;
