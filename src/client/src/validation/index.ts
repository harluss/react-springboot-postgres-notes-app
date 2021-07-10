import * as yup from 'yup';

export const NoteSchema = yup.object().shape({
  title: yup.string().required(),
  details: yup.string().required(),
  isPinned: yup.boolean(),
});
