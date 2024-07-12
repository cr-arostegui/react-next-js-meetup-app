import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';
import { Fragment } from 'react';
import Head from 'next/head';

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
    // <MeetupDetail
    //   image="https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg"
    //   title="A First Meetup"
    //   address="Some Street 5, Some City"
    //   description="The meetup description"
    // />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('test');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id },
    })),
  };
  // return {
  //   fallback: false,
  //   paths: [
  //     {
  //       params: {
  //         meetupId: 'm1',
  //       },
  //     },
  //     {
  //       params: {
  //         meetupId: 'm2',
  //       },
  //     },
  //   ],
  // };
}

export async function getStaticProps(context) {
  // fetch data for single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect('test');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection
    .find({
      _id: ObjectId(meetupId),
    })
    .toArray();

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
  // return {
  //   props: {
  //     meetupData: {
  //       image: "https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg",
  //       id: meetupId,
  //       title: "A First Meetup",
  //       address: "Some Street 5, Some City",
  //       description: "The meetup description",
  //     }
  //   }
  // }
}

export default MeetupDetails;
