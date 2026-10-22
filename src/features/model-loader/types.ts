export type ModelFile = {
  url: string
  name: string
  size: number
  resources: Record<string, string>
  objectUrls: string[]
}

export type SampleModel = {
  id: string
  label: string
}
