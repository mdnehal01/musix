'use client';

import { useState, useEffect } from 'react';
import PageContent from './PageContent';
import Button from '@/components/button';
import { ImPrevious2 } from 'react-icons/im';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// @ts-ignore
const SongPagination = ({ songs }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width > 1536) {
        setLimit(18);
      } else if (width > 1280) {
        setLimit(15);
      } else {
        setLimit(12); // Default limit for other screen sizes
      }
    };

    updateLimit(); // Set initial limit
    window.addEventListener('resize', updateLimit); // Listen for resize events

    return () => {
      window.removeEventListener('resize', updateLimit); // Clean up event listener
    };
  }, []);

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedSongs = songs.slice(start, end);

  const nextPage = () => setPage(prevPage => prevPage + 1);
  const prevPage = () => setPage(prevPage => Math.max(prevPage - 1, 1));

  return (
    <div>
      <PageContent songs={paginatedSongs} />
      <br /><br />
      <div className="w-full flex justify-center gap-x-5">
        <Button onClick={prevPage} className='w-auto rounded-md' disabled={page === 1}><FaAngleLeft/></Button>
        <Button onClick={nextPage} className='w-auto rounded-md' disabled={end >= songs.length}><FaAngleRight/></Button>
      </div>
    </div>
  );
};

export default SongPagination;
