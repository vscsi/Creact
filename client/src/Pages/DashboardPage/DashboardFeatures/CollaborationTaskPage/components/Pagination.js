import React from "react";
import classes from './Pagination.module.css'

const Pagination = ({ tasksPerPage, totalTasks, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(pageNumbers);
  // console.log(tasksPerPage);
  // console.log(totalTasks);
  return (
    <nav className={classes.PaginationNav}>
      <ul className="pagination">
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              {/* eslint-disable-next-line */}
                <a
                  className={classes.PaginationButton}
                  onClick={() => paginate(number)}
                  href="#"
                >
                  {number}
                </a>

              {/* </button> */}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
