import React from 'react'
import { Routes, Route} from 'react-router-dom';
import Landing from '../content/index.js'
function RouteList() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
    </Routes>
  )
}

export default RouteList