export const RESOURCES = {
  'test-download': {
    blob: 'test-download.pdf',          // key in the "downloads" blob store
    filename: 'Kahuconsultants-test-download.pdf', // name the visitor's browser saves it as
  },
} as const;

export type ResourceId = keyof typeof RESOURCES;

export function getResource(id: string) {
  return Object.hasOwn(RESOURCES, id) ? RESOURCES[id as ResourceId] : undefined;
}