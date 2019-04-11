import React from 'react';
import {Link} from 'react-router-dom';

const CompanyLink = ({company}) => {
    const {companyName, _id} = company;
    return <Link to={`/dashboard/${_id}`}>{companyName}</Link>
}
export default CompanyLink;