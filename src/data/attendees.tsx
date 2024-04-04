import { faker } from "@faker-js/faker";

interface Attendee {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  checkedInAt: Date; 
}

export const Attendees: Attendee[] = Array.from({ length: 200 }).map(() => ({
  id: faker.number.int({ min: 10000, max: 20000 }),
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  createdAt: faker.date.recent({ days: 30 }),
  checkedInAt: faker.date.recent({ days: 7 })
}));
