import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg"
      title="A First Meetup"
      address="Some Street 5, Some City"
      description="The meetup description"
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      }
    ]
  }
}

export async function getStaticProps(context) {
  // fetch data for single meetup
  const meetupId = context.params.meetupId;

  console.log('meetupId', meetupId);

  return {
    props: {
      meetupData: {
        image: "https://www.meetingplace.es/wp-content/uploads/2022/02/Galeri%CC%81a-Home-2-1.jpg",
        id: meetupId,
        title: "A First Meetup",
        address: "Some Street 5, Some City",
        description: "The meetup description",
      }
    }
  }
}

export default MeetupDetails;
