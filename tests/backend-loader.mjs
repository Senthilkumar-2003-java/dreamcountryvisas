import fs from 'node:fs/promises';
export async function resolve(specifier, context, next) {
  if (specifier === 'dotenv/config') return { url: 'dcqa:dotenv', shortCircuit: true };
  if (specifier === 'resend') return { url: 'dcqa:mail', shortCircuit: true };
  if (specifier.endsWith('/db.js') && context.parentURL?.includes('/backend/')) return { url: 'dcqa:db', shortCircuit: true };
  return next(specifier, context);
}
export async function load(url, context, next) {
  if (url === 'dcqa:dotenv') return { format: 'module', source: 'export {};', shortCircuit: true };
  if (url === 'dcqa:db') return { format: 'module', shortCircuit: true, source: `
    export const schema = { hasDomain: true };
    export const pool = { async query(sql, params) {
      const state = globalThis.__dcQa;
      state.queries.push({sql, params});
      if(state.dbFailure) throw new Error('QA_PRIVATE_SQL_FAILURE');
      if(sql.startsWith('SELECT')) return [[{id:1,first_name:'QA',program:'Citizenship of Argentina'}]];
      return [{insertId:state.queries.length}];
    }};` };
  if (url === 'dcqa:mail') return { format: 'module', shortCircuit: true, source: `
    export class Resend { constructor() { this.emails={send:async(message)=>{
      const state=globalThis.__dcQa;state.emails.push(message);
      if(state.mailFailure || (state.confirmFailure && message.subject.startsWith('Thank you'))) return {error:{message:'QA_PRIVATE_EMAIL_FAILURE'}};
      return {data:{id:'qa-message'}};
    }}; } }` };
  if (url.endsWith('/backend/server.js')) {
    const source = (await fs.readFile(new URL(url), 'utf8')).replace('app.listen(PORT,', 'export const testServer = app.listen(PORT,');
    return { format: 'module', source, shortCircuit: true };
  }
  return next(url, context);
}
