import type { ComponentType } from 'react';
import type { ProjectMeta } from './types';

type PrototypeModule = { meta: ProjectMeta; default: ComponentType };

// Every projects/<folder>/prototype/index.tsx is picked up automatically.
const modules = import.meta.glob<PrototypeModule>('../../projects/*/prototype/index.tsx', {
  eager: true,
});

export type Project = { slug: string; meta: ProjectMeta; Component: ComponentType };

export const projects: Project[] = Object.entries(modules)
  .map(([path, mod]) => ({
    slug: path.split('/projects/')[1].split('/')[0],
    meta: mod.meta,
    Component: mod.default,
  }))
  .filter((p) => p.slug !== '_template')
  .sort((a, b) => a.slug.localeCompare(b.slug));
