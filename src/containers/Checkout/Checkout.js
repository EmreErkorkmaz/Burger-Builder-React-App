import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/"></Redirect>;
    if (this.props.ings) {
      const purchasedRedirect =  this.props.purchased ? <Redirect to="/"></Redirect> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          ></CheckoutSummary>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          ></Route>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect( mapStateToProps )(Checkout);

// componentDidMount() {
//   // this.setState({ingredients: this.props.match.params.split('&')})
//   const query = new URLSearchParams(this.props.location.search);
//   const ingredients = {};
//   for (let param of query.entries()) {
//     if (param[0] === "price") {
//       this.setState({ totalPrice: param[1] });
//     } else {
//       // ['salad','1']
//       ingredients[param[0]] = +param[1];
//     }
//   }
//   this.setState({ ingredients: ingredients });
// }
