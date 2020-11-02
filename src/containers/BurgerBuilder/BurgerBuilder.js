import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinners from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index'
import { connect } from "react-redux";

export class BurgerBuilder extends Component {
  
  state = {
    purchasing: false,
    
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingredientAmount) => {
        return ingredients[ingredientAmount];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchaseable: sum > 0 ? true : false });
    return sum > 0;
  }

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0; //--> This will turn true or false
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinners></Spinners>;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
          ></BuildControls>
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        ></OrderSummary>
      );
    }

    return (
      <div>
        <Aux>
          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients : () => dispatch(actions.initIngredients()),
    onInitPurchase : () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler(BurgerBuilder, axios));

// purchaseContinueHandler = () => {
//   const queryParams = [];
//   for (let i in this.state.ingredients) {
//     queryParams.push(
//       encodeURIComponent(i) +
//         "=" +
//         encodeURIComponent(this.state.ingredients[i])
//     );
//   }
//   queryParams.push("price=" + this.state.totalPrice);
//   const queryString = queryParams.join("&");
//   this.props.history.push({
//     pathname: "/checkout",
//     search: "?" + queryString,
//   });
// };