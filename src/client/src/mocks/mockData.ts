import { Note } from 'types';
import faker from 'faker';

faker.seed(123);

export const generateDummyNote = (): Note => {
  return {
    id: faker.datatype.uuid.toString(),
    title: faker.lorem.sentences(1),
    details: faker.lorem.sentences(5),
    isPinned: faker.datatype.boolean(),
    createdAt: faker.date.recent().toUTCString(),
    updatedAt: faker.date.recent().toUTCString(),
  };
};
