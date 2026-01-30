import React from 'react'
import {Pagination, PaginationItem} from '@material-ui/lab';
import useStyles from './index';
import {Link} from 'react-router-dom';
function Paginate() {
    const classes = useStyles();
  return (
    <Pagination 
        count={5}
        classes={{ul: classes.ul}}
        variant="outlined"
        color='primary'
        renderItem={(item)=>(
            <PaginationItem {...item} component={Link} to={`posts/item${1}`}/>
        )}
    />
  )
}

export default Paginate