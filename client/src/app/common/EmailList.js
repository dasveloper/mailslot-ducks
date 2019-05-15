import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiChevronDown } from "react-icons/fi";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import Moment from "react-moment";

const EmailList = ( {emails}) => {
  return (
    <div className="email-list-wrapper">

      <ReactTable
        data={emails}
        resizable={false}
        columns={[
          {
            Header: row => (
              <p className="row-header">
                Email <FiChevronDown className="sort-arrow" />
              </p>
            ),
            accessor: "email"
          },
          {
            Header: row => (
              <p className="row-header">
                Added <FiChevronDown className="sort-arrow" />
              </p>
            ),
            accessor: "updated_at",

            Cell: row => (
              <Moment format="MM/DD/YYYY hh:mm A">
                {row.original.updated_at}
              </Moment>
            )
          }
        ]}
        defaultSorted={[
          {
            id: "updated_at",
            desc: true
          }
        ]}
        defaultPageSize={10}
        className="-highlight"
      />
    </div>
  );
};

export default EmailList;
