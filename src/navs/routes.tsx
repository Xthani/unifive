import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages';

export const RouteMap = () => {
  return (
    <Routes>
      <Route path={'*'} element={<Home />} />
    </Routes>
  );
};
