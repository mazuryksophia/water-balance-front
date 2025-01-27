import css from './BtnDelete.module.css';

const BtnDelete = ({ isLoading, handleDelete }) => {
  return (
    <button
      type="button"
      className={css.btnDelete}
      onClick={() => handleDelete()}
      disabled={isLoading}
    >
      Видалити
    </button>
  );
};

export default BtnDelete;
