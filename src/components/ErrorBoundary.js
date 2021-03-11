import React from 'react'
import { Loader } from './utils/Loader';
import "~/css/error_page.scss"

class ErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        errors: false
    };
  }

  static getDerivedStateFromError(error) {
    return {errors: error};
  }
  componentDidCatch(error, errorInfo) {
    return this.setState({errors: {error, errorInfo}})
  }
  render() {
    const {errors} = this.state;

    if (!errors) {
        return this.props.children;
    }
    return (
        <div className="error_page">
            <Loader />
            <h1>
                I'm sorry!
            </h1>
            <div className="sub_text">
                Something went wrong.
                <br/>
                Please reload page and try again
            </div>
        </div>
    )
  }
}

export default ErrorBoundary;
