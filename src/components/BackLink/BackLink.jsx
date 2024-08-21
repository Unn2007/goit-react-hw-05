import { HiArrowLeft } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import css from '../BackLink/BackLink.module.css'
function BackLink({ to, children }) {
    return (
        <div className={css.linkContainer}>
         <Link to={to} className={css.link}>
      <HiArrowLeft size="24" />
      {children}
    </Link>  
        </div>
    )
}

export default BackLink;