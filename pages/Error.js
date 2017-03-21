import React from 'react'

import history from '../core/history'

import Link from '../components/Link'

class ErrorPage extends React.Component {

  static propTypes = {
    error: React.PropTypes.object,
  }

  componentDidMount() {
    document.title = this.props.error && this.props.error.status === 404 ?
      'Page Not Found' : 'Error'
  }

  goBack = event => {
    event.preventDefault()
    history.goBack()
  }

  render() {
    if (this.props.error) console.error(this.props.error) // eslint-disable-line no-console

    const [code, title] = this.props.error && this.props.error.status === 404 ?
      ['404', 'Page not found'] :
      ['Error', 'Oups, something went wrong ... check your search criterias.']

    return (
      <div className='container'>
        <main className='content'>
          <h1 className='code'>{code}</h1>
          <p className='title'>{title}</p>
          {code === '404' &&
            <p className='text'>
              The page you are looking for does not exist or an another error occurred.
              Check your search criterias.
            </p>
          }
          <p className='text'>
            <a href="/" onClick={this.nodegoBack}>Go back</a>, or head over to the&nbsp;
            <Link to="/">home page</Link> to choose a new direction.
          </p>
        </main>
      </div>
    )
  }

}

export default ErrorPage
