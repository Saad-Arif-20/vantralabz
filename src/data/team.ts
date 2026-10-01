import saadArif from '../assets/team/saad-arif.webp';
import hamzaGhouri from '../assets/team/hamza-ghouri.webp';
import muhammadAtta from '../assets/team/muhammad-atta.webp';
import humayun from '../assets/team/humayun.webp';

const SHARED_BIO =
  'One of the four people actually behind Vantralabz — no hand-offs, just hands-on work.';

export const TEAM = [
  {
    firstName: 'Saad',
    lastName: 'Arif',
    role: 'Design, Dev & Automation',
    image: saadArif,
    facePosition: '50% 32%',
    bio: SHARED_BIO,
  },
  {
    firstName: 'Muhammad',
    lastName: 'Atta',
    role: 'Finance & Operations',
    image: muhammadAtta,
    facePosition: '50% 22%',
    bio: SHARED_BIO,
  },
  {
    firstName: 'Hamza',
    lastName: 'Ghouri',
    role: 'Turns Strangers Into Clients',
    image: hamzaGhouri,
    facePosition: '50% 16%',
    bio: SHARED_BIO,
  },
  {
    firstName: 'Humayun',
    lastName: undefined,
    role: 'Closer & Builder',
    image: humayun,
    facePosition: '50% 22%',
    bio: SHARED_BIO,
  },
];
