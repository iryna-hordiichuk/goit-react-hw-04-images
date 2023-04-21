import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { StyledGalleryItem, GalleryImage } from './ImageGalleryItem.styled';

// ImageGalleryItem - єто компонент класс,
// щт имеет стейт согласно которого будем рендерить модалку.
// тоесть айтем котролирует модалку, в методе делаем инверсию
// от ПРЕДІДУЩЕГО, не записіваем поверх

// cтворю окремий портал для модалки,
// так як по замовчуванню z-index одинаковий у всіх сусідів
// stacking context у них один.
// в цій ДЗ модалка рендериться найнижче по списку
// тому візуально проблеми не видно ??? запитати у ментора
export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  toggleModal = () => {
   this.setState(state => ({showModal: !this.state.showModal, }));
  };

  render() {
    const { showModal } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;

    return (
      <>
        <StyledGalleryItem onClick={this.toggleModal}>
          <GalleryImage src={webformatURL} alt={tags} width='400' />
        </StyledGalleryItem>
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.toggleModal}
          />
        )}
      </>
    );
  }
}


