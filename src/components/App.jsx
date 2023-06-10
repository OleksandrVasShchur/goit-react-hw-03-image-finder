import React, { Component } from 'react';
import {toast, ToastContainer } from 'react-toastify';

import Searchbar from './Searchbar/Searchbarl';
import { getImages } from './GetImages/GetImages';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { isVisible } from '@testing-library/user-event/dist/utils';
import Modal from './Modal/Modal';
import css from './App.module.css'
import Loader from './Loader/Loader';
export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isVisible: false,
    error: null,
    showModal: false,
    currentImageUrl: null,
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
        isVisible: this.state.page < Math.ceil(totalHits / 12),
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

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, isLoading, showModal, currentImageUrl } = this.state;

    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onHandlSubmit} />
        {isLoading && < Loader/>}
        {isLoading && < Loader/> && <div>Loading...</div>}
        {images.length === 0 && <p className={css.message}>Please enter your search details...</p>}
        {error && <p>Something went wrong </p>}

        {images && <ImageGallery images={images} openModal={this.openModal} />}

        {isVisible && images.length > 0 && (
          <Button onClick={this.onLoadMore} disabled={isLoading} />
        )}

        {showModal && (
          <Modal
            src={currentImageUrl}
            describ={'largePicture'}
            onCloseModal={this.toggleModal}
          />
        )}

        <ToastContainer />
      </section>
    );
  }
}
