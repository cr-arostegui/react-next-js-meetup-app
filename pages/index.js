import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';
import { Fragment } from 'react';

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

const CONNECTION_STRING = 'test';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  MongoClient.connect();

  const client = await MongoClient.connect(CONNECTION_STRING);
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      //meetups: DUMMY_MEETUPS,
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
