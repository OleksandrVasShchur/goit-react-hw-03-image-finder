import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import Notiflix from 'notiflix';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {

      Notiflix.Notify.failure("Введіть щось в поле для пошуку...!")
      return;
    }

    const { query } = this.state;
    this.props.onSubmit(query);

    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm_button}>
            <span class="button-label">Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            value={query}
            onChange={this.handleInputChange}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
