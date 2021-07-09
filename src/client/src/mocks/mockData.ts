import { Note } from 'types';
import faker from 'faker';
import { factory, primaryKey } from '@mswjs/data';

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

// export const mockData = factory<{ note: Note }>({
export const mockData = factory({
  note: {
    id: primaryKey(faker.datatype.uuid),
    title: () => faker.lorem.sentences(1),
    details: () => faker.lorem.sentences(5),
    isPinned: () => faker.datatype.boolean(),
    createdAt: () => faker.date.recent().toUTCString(),
    updatedAt: () => faker.date.recent().toUTCString(),
  },
});
