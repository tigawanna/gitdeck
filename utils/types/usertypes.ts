export interface Viewer {
  id: string
  name: string
  login: string
  email: string
  bio: string
  avatarUrl: string
  company: any
  twitterUsername: any
  createdAt: string
  isFollowingViewer: boolean
  viewerIsFollowing: boolean
  isViewer: boolean
  location: string
  url: string
  followers: Followers
  following: Following
  repositories: Repositories
}


export interface OneUser {
  name: string;
  login: string;
  email: string;
  bio: string;
  avatarUrl: string;
  company: any;
  twitterUsername: any;
  createdAt: string;
  isFollowingViewer: boolean;
  viewerIsFollowing: boolean;
  isViewer: boolean;
  location: string;
  url: string;
  followers: Followers;
  following: Following;
}


export interface Followers {
  totalCount: number;
  nodes: CountNode[];
}


export interface Following {
  totalCount: number;
  nodes: CountNode[];
}

export interface Repositories {
  totalCount: number
  nodes: CountNode[]
}

export interface CountNode {
  id: string;
}
