import React from 'react';

import { useFetchHook } from "./hooks/useFetch/useFetch.hook";

import { Container } from "./components/Container/container.component";
import Slider from "./components/Slider/slider.component";

function App() {
  const { data, loading } = useFetchHook('photos');

  return (
      <Container>
          {!loading && <Slider data={data.slice(0, 6)} />}
          {loading && <>Loading...</>}
      </Container>
  );
}

export default App;
