import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyle=makeStyles(theme => ({
    pagination: {
        display: 'flex',
        flexDirection: 'row'
    },
    pageItem: {
        listStyleType: 'none',
        marginRight: '10px'
    }
}))

const Pagination = ({messagesPerPage, totalMessages, paginate}) => {
    const classes = useStyle();

    const pageNumbers = [];

    for (let i=1; i<=Math.ceil(totalMessages/ messagesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={classes.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={classes.pageItem}>
            <a onClick={() => paginate(number)} href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
        </div>
    )
}

export default Pagination
