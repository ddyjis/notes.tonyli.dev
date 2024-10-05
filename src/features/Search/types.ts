import { type Metadata } from "@/lib/preflight"

export type SearchResult = Omit<Metadata['notes'][string], 'embedding'>
export type SearchStatus = 'idle' | 'loading' | 'error'
