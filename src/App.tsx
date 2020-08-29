import React from 'react';
import logo from './logo.svg';
import './App.less';
import { useStore } from '@/components/Provider';
import Selection from '@/components/Selection/Selection';
import { RouterContainer } from '@/components/RouterContainer/RouterContainer';

function App() {
  return (
    <RouterContainer/>
  );
}

export default App;
 