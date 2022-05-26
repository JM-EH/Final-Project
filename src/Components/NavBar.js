import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PathIncludes = (path) => {
  return useLocation().pathname.match(path) !== null;
};

const NavBar = () => {
  return (
    <div id="navigation">
      <nav>
        <IconButton
          variant="contained"
          component={Link}
          color={useLocation().pathname === '/' ? 'warning' : 'primary'}
          to="/"
        >
          {useLocation().pathname === '/' ? <ChevronRightIcon /> : null}
          Home
        </IconButton>
        |{' '}
        <IconButton
          variant="contained"
          component={Link}
          color={PathIncludes('categories') ? 'warning' : 'primary'}
          to="/categories"
        >
          {PathIncludes('categories') ? <ChevronRightIcon /> : null}
          Categories
        </IconButton>
        |{' '}
        <IconButton
          variant="contained"
          component={Link}
          color={PathIncludes('products') ? 'warning' : 'primary'}
          to="/products"
        >
          {PathIncludes('products') ? <ChevronRightIcon /> : null}
          Products
        </IconButton>
      </nav>
    </div>
  );
};
export default NavBar;
