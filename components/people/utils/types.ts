
//following 
export interface ROOTFOLLOWERS {
  pages: FOLLOWERSPAGE[];
  pageParams: any[];
}

export interface FOLLOWERSPAGE {
  user: FOLLOWERS;
}

export interface FOLLOWERS {
  followers: Follow;
}

// following typw
export interface ROOTFOLLOWING {
  pages: FOLLOWINGPAGE[];
  pageParams: any[];
}

export interface FOLLOWINGPAGE {
  user: FOLLOWING;
}

export interface FOLLOWING {
  following: Follow;
}

export interface Follow {
  edges: Edge[];
  totalCount: number;
  pageInfo: PageInfo;
}
export interface Edge {
  node: Node;
}

export interface Node {
  login: string;
  avatarUrl: string;
  id: string;
}

export interface PageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FOLLOWNODE {
  login: string;
  avatarUrl: string;
  id: string;
}

export interface MINIUSER {
  login: string;
  id: string;
  isFollowingViewer: boolean;
  viewerIsFollowing:boolean;
  bio: string;
  avatarUrl: string;
  isViewer: boolean;
  url: string;
}








