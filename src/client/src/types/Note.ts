type Note = {
  id: number;
  title: string;
  details: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type { Note as default };

// TODO: fix date type/format issue
