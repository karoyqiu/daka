import Dexie from 'dexie';

/** 打卡任务 */
export interface Job {
  id?: number;
  /** 名称 */
  name: string;
  /** 每日打卡提醒时间，HH:mm */
  time: string;
}

/** 打卡记录 */
export interface JobRecord {
  id?: number;
  /** 任务 ID */
  jobId: number;
  /** 打卡时间 */
  time: Date;
}

class Database extends Dexie {
  jobs!: Dexie.Table<Job, number>;
  records!: Dexie.Table<JobRecord, number>;

  constructor() {
    super('dakadb');
    this.version(1).stores({
      jobs: '++id',
      records: '++id, jobId, time',
    });
  }
}

const db = new Database();
export default db;
