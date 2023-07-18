import { checkIn, getJobs } from '@/lib/db';

declare var self: ServiceWorkerGlobalScope & typeof globalThis;

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'done') {
    event.waitUntil(checkIn(parseInt(event.notification.tag, 10)));
  }
});

const check = async () => {
  const jobs = (await getJobs()).filter((job) => !job.checked && job.late);

  const promises = jobs.map((job) => (
    self.registration.showNotification(`别忘了${job.name}！`, {
      actions: [
        {
          action: 'done',
          title: '搞定',
        },
      ],
      requireInteraction: true,
      tag: `${job.id}`,
    })
  ));

  await Promise.all(promises);
};

setInterval(check, 30 * 1000);
