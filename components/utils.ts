export interface LessonProps {
  data: {
    answerchoices: string[]
    title: string
    slug?: any
    question: string
    correct: string
    heading: string
    lesson?: number
    prev?: string
    next?: string
    desc: string
    unit: string
  }
  content: string
  lessons: {
    cs: { title: string; lesson: string; slug: string; unit: string }
    math: { title: string; lesson: string; slug: string; unit: string }
    science: { title: string; lesson: string; slug: string; unit: string }
  }
}
