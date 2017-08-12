import React, { Component } from 'react';
import { auth, googleAuthProvider, githubAuthProvider} from './firebase';

class SignIn extends Component {
    render() {
        return (
            <div className="SignIn">
                <button onClick={()=> auth.signInWithRedirect(githubAuthProvider)}>
                    Sign In with Github
                </button>
                <button onClick={()=> auth.signInAnonymously() }>
                    Sign In as a guest
                </button>
            </div>
        )
    }
}

export default SignIn;