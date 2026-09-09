/**
 * Proposed relational schema for KawsayInfo.
 *
 * This file documents the intended database structure so the platform
 * can later be connected to a real backend (Neon/Postgres, Supabase, etc.)
 * without reshaping the application layer. The current app uses the
 * in-memory data in `lib/data.ts` and `services/auth-context.tsx`, which
 * mirror these types.
 */

export interface DbUser {
  id: string
  nombre: string
  email: string
  idioma: 'es' | 'qu'
  ubicacion: string
  rol: 'user' | 'admin'
  creado_en: string
}

export interface DbCategoria {
  id: string
  nombre_es: string
  nombre_qu: string
  descripcion_es: string
  descripcion_qu: string
}

export interface DbContenido {
  id: string
  categoria_id: string
  titulo_es: string
  titulo_qu: string
  descripcion_es: string
  descripcion_qu: string
  idiomas: Array<'es' | 'qu'>
  institucion: string
  imagen_url: string | null
  actualizado_en: string
}

export interface DbConsulta {
  id: string
  usuario_id: string
  pregunta: string
  respuesta: string
  creado_en: string
}

export interface DbTramite {
  id: string
  titulo_es: string
  titulo_qu: string
  institucion: string
  documentos: string[]
  pasos: Array<{ titulo_es: string; titulo_qu: string; detalle_es: string; detalle_qu: string }>
}

/** Reference DDL kept as a string for future migrations. */
export const proposedSql = `
create table usuario (
  id text primary key,
  nombre text not null,
  email text unique not null,
  idioma text not null default 'es',
  ubicacion text,
  rol text not null default 'user',
  creado_en timestamptz not null default now()
);

create table categoria (
  id text primary key,
  nombre_es text not null,
  nombre_qu text not null,
  descripcion_es text,
  descripcion_qu text
);

create table contenido (
  id text primary key,
  categoria_id text references categoria(id),
  titulo_es text not null,
  titulo_qu text not null,
  descripcion_es text,
  descripcion_qu text,
  institucion text,
  imagen_url text,
  actualizado_en timestamptz not null default now()
);

create table consulta (
  id text primary key,
  usuario_id text references usuario(id),
  pregunta text not null,
  respuesta text,
  creado_en timestamptz not null default now()
);

create table tramite (
  id text primary key,
  titulo_es text not null,
  titulo_qu text not null,
  institucion text,
  documentos jsonb,
  pasos jsonb
);
`
