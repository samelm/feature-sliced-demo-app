import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useStore } from 'effector-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '@brunhild/pages/paths';
import { Project } from '@brunhild/shared/api';
import {
  $projectEditFormSavePending,
  projectEditFormChangeDescription,
  projectEditFormChangeName,
  projectEditFormSave,
} from '../../model';

const FormRow = styled.div`
  margin-bottom: 15px;
`;

interface Props {
  initialState: Project | null;
}

export function ProjectEditForm(props: Props) {
  const { initialState } = props;
  const savePending = useStore($projectEditFormSavePending);

  if (!initialState) {
    return null;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    projectEditFormSave();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    projectEditFormChangeName(e.target.value);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) =>
    projectEditFormChangeDescription(e.target.value);

  return (
    <form onSubmit={handleFormSubmit}>
      <FormRow>
        <TextField name="name" value={initialState.name} onChange={handleChangeName} />
      </FormRow>
      <FormRow>
        <TextField
          name="description"
          value={initialState.description}
          onChange={handleChangeDescription}
        />
      </FormRow>
      <FormRow>
        <LoadingButton type="submit" loading={savePending} variant="contained">
          Save
        </LoadingButton>
        <Button to={paths.home()} component={Link}>
          Back
        </Button>
      </FormRow>
    </form>
  );
}
