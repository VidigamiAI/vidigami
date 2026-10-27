export type ProjectMeta = {
  key: string;
  title: string;
  status: 'exploring' | 'testing' | 'handed-off';
  summary?: string;
};
