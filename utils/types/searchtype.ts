export interface SearchResult {
  repositoryCount: number
  discussionCount: number
  userCount: number
  codeCount: number
  issueCount: number
  wikiCount: number
  edges: SearchEdge[]
}

export interface SearchEdge {
  node: SearchNode
}

export interface SearchNode {
  login: string
  name: string
  email: string
  avatarUrl: string
  url: string
}
