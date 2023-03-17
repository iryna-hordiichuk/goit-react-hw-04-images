import { Component } from 'react';
import { createPortal } from 'react-dom';
import { StyledOverlay, StyledModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackDropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <StyledOverlay onClick={this.handleBackDropClick}>
        <StyledModal>
          <img src={largeImageURL} alt={tags} />
        </StyledModal>
      </StyledOverlay>,
      modalRoot
    );
  }
}
