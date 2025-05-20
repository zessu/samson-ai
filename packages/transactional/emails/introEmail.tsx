import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Link,
} from "@react-email/components";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

export const IntroEmailTemplate = () => (
  <Html>
    <Head />
    <Preview>Welcome to SAMSON – Your AI Personal Trainer is Ready!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src="https://i.ibb.co/yFdMngnS/samson.webp" // Update this path if needed
          width="50"
          height="50"
          alt="SAMSON Logo"
          style={logo}
        />

        <Text style={paragraph}>
          Hi <strong>There</strong>,
        </Text>

        <Text style={paragraph}>
          Welcome to <strong>SAMSON</strong> – your AI-powered personal trainer
          designed to help you reach your fitness goals smarter and faster than
          ever before! 💪🤖
        </Text>

        <Text style={paragraph}>
          Whether you're just starting out or looking to level up your fitness
          journey, Samson will create personalized workouts, nutrition plans,
          and daily guidance tailored just for you.
        </Text>

        <Text style={paragraph}>Here’s what you can expect:</Text>

        <Text style={paragraph}>
          🏋️‍♀️ <strong>Custom Workouts:</strong> Built around your goals, fitness
          level, and equipment
          <br />
          🥗 <strong>Nutrition Guidance:</strong> Designed to match your
          lifestyle and dietary preferences
          <br />
          📈 <strong>Progress Tracking:</strong> Adapts as you grow stronger and
          hit milestones
          <br />
          🔔 <strong>Daily Motivation:</strong> From Samson himself — to keep
          you consistent and motivated
        </Text>

        <Text style={paragraph}>
          We are currently working on a dashboard where you can personalise your
          settings, track your metrics and chat directly with Samson. Once that
          is done, we will notify you via email. For now, you will still receive
          all your expected workouts via email everyday an hour before your next
          workout.
        </Text>

        <Section style={btnContainer}>
          <Button style={button} href="https://yourapp.com/open ">
            Open App
          </Button>
        </Section>

        <Text style={paragraph}>
          We’re rooting for you — and so is Samson 😉
          <br />
          Let’s crush those goals together!
        </Text>

        <Text style={paragraph}>The SAMSON Team</Text>

        <Hr style={hr} />

        <Text style={footer}>
          P.S. Got questions or feedback? Just reply to this email — we’d love
          to hear from you!
        </Text>
      </Container>

      {/* Footer Section */}
      <Section
        style={{
          maxWidth: 600,
          margin: "0 auto",
          padding: "40px 20px",
          backgroundColor: "rgb(45, 24, 83)",
          color: "#fff",
        }}
      >
        <Row>
          <Column colSpan={4}>
            <Text
              style={{
                margin: 0,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              SAMSON
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Your personal AI fitness trainer
            </Text>

            <Row>
              <Column
                style={{
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                <Link href="https://instagram.com/your.samson ">
                  <Img
                    alt="Instagram"
                    src="https://react.email/static/instagram-logo.png "
                    width="36"
                    height="36"
                  />
                </Link>
              </Column>
            </Row>

            <Row>
              <Text
                style={{
                  margin: "16px 0 4px 0",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Made For You With ♥️
              </Text>
              <Text
                style={{
                  margin: "0",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Contact Email: plant-shirt-chemo@duck.com
              </Text>
            </Row>
          </Column>
        </Row>
      </Section>
    </Body>
  </Html>
);

IntroEmailTemplate.PreviewProps = {
  userFirstname: "There",
} as KoalaWelcomeEmailProps;

export default IntroEmailTemplate;

// === STYLES ===

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
  width: "100px",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
