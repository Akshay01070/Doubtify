import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }));

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 20 })
      ]);
    }, 1500);
  };

  return (
    <div className=''>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4></h4>}
      >
        {items.map((_, index) => (
          <div key={index}>
            <Hero classname="mt-[50px]" />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
