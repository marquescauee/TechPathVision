export interface Roadmap {
  title: string
  subjects: Subject[]
}

export interface Subject {
  title: string
  description: string
  content: string[]
  documentation: Documentation[]
}

export interface Documentation {
  title: string
  url: string
}
