
import css from './SearchBox.module.css';

export const SearchBox = ({  onSearch,setQueryParams }) => {

    function handleSubmit(event) {
        event.preventDefault()
        const form = event.target;
    const { value } = form.elements;
   
    onSearch(value.value)
    setQueryParams(value.value);
   
    form.reset();

    }



  return (
    <form className={css.wrapper} onSubmit={handleSubmit}>
       
      
      <input
        className={css.input}
        type="text"
        name="value"
       
      />
       <button type='submit' >Search</button>
    </form>
  );
};

export default SearchBox;