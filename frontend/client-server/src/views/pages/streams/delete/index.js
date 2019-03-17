import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteModal from '../../../components/delete-modal';
import history from '../../../../history';
import { handleFetchStream, handleDeleteStream } from '../../../../store/actions'; 

const StreamDelete = class extends Component {
  componentDidMount(){
    document.addEventListener('keydown', this.handleEscapeKey, false);
    const { handleFetchStream, match } = this.props;
    handleFetchStream(match.params.id);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleEscapeKey, false);
  }

  handleEscapeKey = (event) => {
    if(event.keyCode === 27) history.push('/');
  }

  render() {
    const { stream, hasSignedInState, handleDeleteStream, match } = this.props;
    if (!(hasSignedInState && stream)) return null;
    return (
      <Fragment>
        <DeleteModal
          title="Delete your Stream"
          content="Are you sure you want to delete this stream?"
          actionsMarkup={ (
            <div className="button-group">
              <button className="alert radius bordered shadow button"
                onClick={ () => handleDeleteStream(match.params.id) }>Delete</button>
              <Link to="/" type="button" 
                className="secondary radius bordered shadow button">Cancel</Link>
            </div>
          ) }
          handleDismiss={ () => history.push('/') }
        />
        <div className="grid-x grid-margin-x grid-padding-y">
          <div className="cell medium-12">
            <h3>{ stream.title }</h3>
          </div>
          <div className="cell medium-12 padding-top-0">
            <div className="radius bordered shadow card">
              <div className="card-section">
                <p>{ stream.description }</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
};

StreamDelete.defaultProps = {
  stream: null,
  match: null,
  hasSignedInState: null,
  handleFetchStream: () => {},
  handleDeleteStream: () => {},
};

export default connect(
  ({ streams, auth: { hasSignedInState } = {}  }, { match }) => ({ 
    stream: streams[match.params.id], hasSignedInState,
  }),
  { handleFetchStream, handleDeleteStream },
)(StreamDelete);

