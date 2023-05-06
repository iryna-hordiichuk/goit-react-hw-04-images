import { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';
import { StyledApp } from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import * as ImageServise from '../../services/api';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  // const [isError, setIsError] = useState(false);

  const onSubmit = searchQuery => {
    if (searchQuery.trim() === '') {
      toast('Please enter your search criteria'); // юзер клікнув "шукати" із порожнім інпутом
      return;
    }
    if (searchQuery === query) {
      toast('Please enter another search criteria'); // користувач клікнув шукати, не змінивши пошуковий запит
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const getPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    // setIsError(false);
    setIsLoading(true);
    async function getImagesGallery() {
      try {
        const images = await ImageServise.getImages(query, page);
        if (images.hits.length === 0) {
          setIsEmpty(true);
          toast('Sorry, no images were found');
        }

        setImages(prevImages => [...prevImages, ...images.hits]);
        setIsShown(prevPage => prevPage < Math.ceil(images.totalHits));
        setIsEmpty(false);
      } catch (error) {
        // setIsError(true);
        toast.error('Something went wrong, please try again');
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getImagesGallery();
  }, [query, page]);

  return (
    <StyledApp>
      <Searchbar onSubmit={onSubmit} />
      <Toaster position="top-right" />
      {isLoading && <Loader />}
      {!isEmpty && <ImageGallery images={images} />}
      {isShown && !isLoading && <Button onClick={getPage}> Load more </Button>}
    </StyledApp>
  );
};

// так як повідомлення про помилку виводиться тостером в блоці catch, мені не потрібен стейт isError
// якби був окремий компонент повідомлення про помилку
// то тоді потрібен був би стейт, щоб це повідмлення 
// рендирити на екран if isError true
// Чому лінтер не підкреслив isError never read в компоненті класі. 
// тому що у комп. ф-її стейт доступний як звичайна змінна в області бачення ф-її ?