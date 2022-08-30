
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
  node: OneUser;
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


export interface OneUser {
  id: string;
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
  nodes: FollowNode[];
}

export interface Following {
  totalCount: number;
  nodes: FollowNode[];
}

export interface FollowNode {
  id: string;
}





