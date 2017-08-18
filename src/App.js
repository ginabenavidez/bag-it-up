import React, { Component } from 'react';
import { auth, database } from './firebase';
import CurrentUser from './CurrentUser';
import SignIn from './Signin';
import NewShoppingList from './NewShoppingList';
import ShoppingLists from './ShoppingLists'

class App extends Component {
  constructor(props){
    super(props);
    this.shoppingListsRef = null;
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => { 
      this.setState({ user });
      { if (user) {
        this.shoppingListsRef = database.ref('/shopping_list').child(user.uid);
        this.shoppingListsRef.on('value', (snapshot) => {
          this.setState({ shoppingLists: snapshot.val() })
        })}
      }
    })
  }

  render() {
    const { user, shoppingLists } = this.state;
    return (
      <div>
        <div>
          <h2>Bag It Up!</h2>
        </div>
          <div>
          { user
            ? <div>
                <NewShoppingList
                  shoppingListsRef={this.shoppingListsRef} user={user}
                  placeholderAttribute={"List name"}
                />
                {
                  shoppingLists &&
                  <ShoppingLists shoppingLists={shoppingLists} user={user} shoppingListsRef={this.shoppingListsRef}/>
                }
                <CurrentUser user={user} />
              </div>
            : <SignIn />
          }
  
          </div>
      </div>
    );
  }
}

export default App;
