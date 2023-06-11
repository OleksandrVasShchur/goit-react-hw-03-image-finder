import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbarl';
import { getImages } from 'GetImages/GetImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import css from './App.module.css';
import Loader from './Loader/Loader';
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    tags: '',
    isLoading: false,
    error: null,
    showModal: false,
    currentImageUrl: null,
    total: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.receiveImages(query, page);
    }
  }

  receiveImages = async (query, page) => {
    if (!query) {
      return;
    }

    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await getImages(query, page);

      if (hits.length === 0) {
        toast.error('Sorry, no images available');
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        total: totalHits,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandlSubmit = value => {
    this.setState({ query: value, page: 1, images: [], error: null });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = (largeImageURL, tags) => {
    this.setState({
      showModal: true,
      currentImageUrl: largeImageURL.target.src,
      tags,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      currentImageUrl: null,
      tags: '',
    });
  };

  render() {
    const { images, error, isLoading, showModal, currentImageUrl, total } =
      this.state;
    const totalPages = total / images.length;

    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onHandlSubmit} />
        {isLoading && <Loader />}
        {images.length === 0 && (
          <p className={css.message}>Please enter your search details...</p>
        )}
        {error && <p>Something went wrong </p>}

        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {totalPages > 1 && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore} disabled={isLoading} />
        )}

        {showModal && (
          <Modal
            src={currentImageUrl}
            describ={'largePicture'}
            onCloseModal={this.closeModal}
          />
        )}

        <ToastContainer />
      </section>
    );
  }
}
