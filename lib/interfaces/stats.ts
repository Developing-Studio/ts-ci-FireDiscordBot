export interface Stats {
  cpu: number;
  ram: string;
  totalRam: string;
  aetherStats: AetherStats;
  clusterCount: number;
  shardCount: number;
  guilds: number;
  users: number;
  events: number;
  clusters: Cluster[];
}

export interface AetherStats {
  cpu: number;
  ram: string;
  ramBytes: number;
}

export interface Cluster {
  id: number;
  name: string;
  env: string;
  user: string;
  userId: string;
  started: string;
  uptime: string;
  cpu: number;
  ram: string;
  ramBytes: number;
  pid: number;
  version: string;
  versions: string;
  guilds: number;
  unavailableGuilds: number;
  users: number;
  userStatuses: { online: number; dnd: number; idle: number; offline: number };
  commands: number;
  events: number;
  shards: Shard[];
}

export interface Shard {
  id: number;
  wsPing: number;
  guilds: number;
  unavailableGuilds: number;
  users: number;
  userStatuses: { online: number; dnd: number; idle: number; offline: number };
  status: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  publicGuilds?: string[];
  discoverableGuilds?: {
    name: string;
    id: string;
    icon: string;
    splash: string;
    vanity: string;
    members: number;
  }[];
}
