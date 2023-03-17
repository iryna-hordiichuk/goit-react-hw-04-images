import { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { StyledApp, ErrorMessage } from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Button } from 'components/Button/Button';
import * as ImageServise from '../../services/api';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isShown: false,
    isEmpty: false,
    isError: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImagesGallery(query, page);
    }
  }

  onSubmit = query => {
    if (query.trim() === '') {
      toast('Please enter your search criteria'); // юзер клікнув "шукати" із порожнім інпутом
      return;
    }
    if (query === this.state.query) {
      toast('Please enter another search criteria'); // користувач клікнув шукати, не змінивши пошуковий запит 
      return;
    }

    this.setState({
      query: query,
      page: 1,
      images: [],  // це щоб не висіли фото від попереднього запиту
    });
  };

  getImagesGallery = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ isLoading: true });

    try {
      const images = await ImageServise.getImages(query, page);

      if (images.hits.length === 0) {
        this.setState({ isEmpty: true });
      }

        this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        isShown: prevState.page < Math.ceil(images.totalHits / 12),
        isEmpty: false,
      }));
    } catch (error) {
      this.setState({ isError: true });
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isEmpty, isLoading, isShown, query, isError } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.onSubmit} />
        <Toaster position="top-right" />
        {!isEmpty && <ImageGallery images={images} />}
        {isShown && (
          <Button onClick={this.getPage}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {query && isEmpty && <ErrorMessage>Sorry, no images were found.</ErrorMessage>}
      </StyledApp>
    );
  }
}
