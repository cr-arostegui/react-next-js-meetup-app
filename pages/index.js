import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image:
      'https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image:
      'https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a second meetup',
  },
];

function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
