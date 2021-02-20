import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';

import fetchPicture from '../../services/pixabayAPI';
import ImageGallery from '../ImageGallery';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';


class BodyGallery extends Component {
  state = {
    hits: [],
    search: '',
    page: 1,
    messenge: 'Something went wrong :(',
    loading: false,
    showModal: false,
    imageForModal: '',
    title: '',
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;

    if (prevSearch !== nextSearch) {
      this.setState({ loading: true });
      this.loadData(nextSearch, 1);
    }

    if (prevState.hits.length < this.state.hits.length) {
      this.scrollPageToEnd();
    }
  }

  getDataForGallery = () => {
    const search = this.props.search;

    this.setState(prevState => ({
      loading: true,
    }));

    this.loadData(search, this.state.page + 1);
  };

  loadData(search, page) {
    return fetchPicture(search, page)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          toast.error(`There is nothing about ${search}`);
        }
        this.setState(prevState => ({
          hits: page === 1 ? hits : [...prevState.hits, ...hits],
          page: page,
          totalHits: totalHits,
        }));
      })
      .catch(error => {
        toast.error(`Something went wrong. Try again later :(`);
      })
      .finally(() => this.setState({ loading: false }));
  }

  addSearch = name => {
    this.setState({ search: name });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.getDataForGallery();
  };

  scrollPageToEnd = () => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onClickGalleryItem = (src, alt) => {
    this.toggleModal();
    this.setState({ imageForModal: src, title: alt });
  };

  render() {
    const { hits, loading, showModal, imageForModal, title, totalHits } = this.state;

    return (
      <>
        {loading === true && <Loader type="TailSpin" color="#3f78a7" height={80} width={80} timeout={3000}/>}
        <ImageGallery>
          {hits.length !== 0 && (
            <ImageGalleryItem hits={hits} onClickGalleryItem={this.onClickGalleryItem} />
          )}
        </ImageGallery>

        {hits.length > 0 && hits.length < totalHits && <Button loadMore={this.loadMore} />}
        {showModal && (
          <Modal onClick={this.onClickGalleryItem}>
            <img src={imageForModal} alt={title} />
          </Modal>
        )}
      </>
    );
  }
}

export default BodyGallery;