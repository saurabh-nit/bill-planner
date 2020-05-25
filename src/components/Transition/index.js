import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './style.scss';

const Transition = ({ children, visible, classNames }) => (
  <CSSTransition in={visible} timeout={300} classNames={classNames} unmountOnExit>
    {children}
  </CSSTransition>
);

Transition.defaultProps = {
  classNames: 'fade'
};

export default Transition;
