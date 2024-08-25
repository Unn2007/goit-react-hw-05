import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBox.module.css";

export const SearchBox = ({ setQueryParams }) => {
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { value } = form.elements;
    const inputValue = value.value.trim();
    if (inputValue === "") {
      toast.error("Please enter search term!", {
        position: "top-right",
      });

      return;
    }

    setQueryParams(inputValue);

    form.reset();
  }

  return (
    <form className={css.wrapper} onSubmit={handleSubmit}>
      <Toaster />

      <input className={css.input} type="text" name="value" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
