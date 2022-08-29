export interface Viewer {
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
  nodes: FollowNode[];
}


export interface Following {
  totalCount: number;
  nodes: FollowNode[];
}

export interface FollowNode {
  id: string;
}
