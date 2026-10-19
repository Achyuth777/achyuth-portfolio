import {rm} from 'node:fs/promises';
// Only generated output is removed; source and repository history are untouched.
await Promise.all(['dist','.prerender'].map(path=>rm(new URL('../'+path,import.meta.url),{recursive:true,force:true})));
