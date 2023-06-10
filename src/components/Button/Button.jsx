import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ disabled, onClick }) => {
  return (
    <button className={css.button_load} type="button" onClick={onClick}>
      {disabled ? 'Loading...' : 'Load more'}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
