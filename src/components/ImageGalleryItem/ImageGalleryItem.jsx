import { useState } from 'react';
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

export const ImageGalleryItem = ({id, largeImageURL, webformatURL, tags }) => {

const [showModal, setShowModal] = useState(false);

const toggleModal = () => {
  setShowModal(prevShowModal => !prevShowModal)
}

return (
  <>
    <StyledGalleryItem key={id} onClick={toggleModal}>
      <GalleryImage src={webformatURL} alt={tags} width='400' />
    </StyledGalleryItem>
    {showModal && (
      <Modal
        largeImageURL={largeImageURL}
        tags={tags}
        onClose={toggleModal}
      />
    )}
  </>
);



}




ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
