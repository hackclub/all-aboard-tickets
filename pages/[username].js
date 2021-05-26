import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  Card,
  Button,
  Flex,
  Image,
  Link
} from 'theme-ui'
import Head from 'next/head'
import Tilt from 'react-tilt'
import Meta from '../components/meta'

export default function App({ username, name }) {
  return (
    <Box
      sx={{
        backgroundColor: '#906b52',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23694e3c' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E")`
      }}
    >
      <Meta
        title={`${name} is going to this Saturday's secret Hack Club meeting.`}
        image={`https://tickets.hackclub.com/api/ticket?username=${username}`}
      />
      <Container variant="copy">
        <Flex
          sx={{
            minHeight: '100vh',
            justifyContent: 'center',
            justifyItems: 'center',
            alignItems: 'center',
            alignContent: 'center',
            color: 'white'
          }}
        >
          <Box sx={{}}>
            <Tilt
              className="Tilt"
              options={{ max: 7, perspective: 200 }}
              style={{ width: '100%' }}
            >
              <Image
                src={`/api/ticket?username=${username}`}
                sx={{
                  width: '100%',
                  boxShadow: 'elevated',
                  borderRadius: 'extra'
                }}
              />
            </Tilt>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button sx={{ mr: 3 }} as="a" href={`https://twitter.com/intent/tweet?text=Heading%20to%20a%20secret%20%40hackclub%20meeting%20this%20Saturday...%20I%20wonder%20what%20is%20happening...%20https%3A%2F%2Ftickets.hackclub.com%2F${username}`}>
                Share on Twitter
              </Button>
              <Button as="a" download href={`/api/ticket?username=${username}`}>Download Ticket</Button>
            </Box>
          </Box>
        </Flex>
      </Container>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tilt.js/1.0.3/tilt.jquery.min.js"></script>
    </Box>
  )
}

export async function getServerSideProps({ params }) {
  const { WebClient } = require('@slack/web-api')

  const token = process.env.SLACK_TOKEN

  const web = new WebClient(token)

  let details = await web.users.info({
    user: params.username
  })
  return {
    props: { username: params.username, name: details.user.profile.real_name}
  }
}
