import Dexie from 'dexie';
import isToday from 'dayjs/plugin/isToday';
import dayjs from 'dayjs';
dayjs.extend(isToday);

/** 打卡任务 */
export interface Job {
  id?: number;
  /** 名称 */
  name: string;
  /** 每日打卡提醒时间，HH * 100 + mm */
  time: number;
}

/** 打卡记录 */
export interface JobRecord {
  id?: number;
  /** 任务 ID */
  jobId: number;
  /** 打卡时间 */
  time: Date;
}

export type JobWithRecord = Job & {
  recordTime?: Date,
  checked: boolean;
  late: boolean;
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

const isCheckedToday = (recordTime?: Date) => {
  if (recordTime) {
    const d = dayjs(recordTime);

    if (d.isToday()) {
      return true;
    }
  }

  return false;
};

const getNow = () => {
  const now = new Date();
  return now.getHours() * 100 + now.getMinutes();
};

export const getJobs = async () => {
  const jobs = await db.jobs.toArray();
  const now = getNow();

  return Promise.all(jobs.map<Promise<JobWithRecord>>(async (job) => {
    const records = await db.records.where('jobId').equals(job.id!).reverse().sortBy('time');
    const record = records[0];

    return {
      ...job,
      recordTime: record?.time,
      checked: isCheckedToday(record?.time),
      late: job.time <= now,
    };
  }));
};

export const checkIn = async (jobId: number) => {
  await db.records.add({
    jobId,
    time: new Date(),
  });
};
