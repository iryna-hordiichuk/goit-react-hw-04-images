
import { Formik } from 'formik';
import {
  StyledHeader,
  StyledForm,
  SearchButton,
  SearchButtonLabel,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

const initialValues = {
    query: '',
};

export const Searchbar = ({onSubmit}) => {
    const handleSubmit = ({query}, {resetForm}) => {
        onSubmit(query);
        resetForm();
    }
  return (
    <StyledHeader>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <StyledForm>
          <SearchButton type='submit'>
            <SearchButtonLabel>Search</SearchButtonLabel>
          </SearchButton>
          <SearchFormInput
            name='query'
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </StyledForm>
      </Formik>
    </StyledHeader>
  );
};
