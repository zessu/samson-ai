import {
  Button,
  Html,
  Heading,
  Text,
  Section,
  Row,
  Column,
  Link,
  Img,
} from "@react-email/components";

export const DailyWorkoutsTemplate = () => {
  return (
    <Html>
      <table
        align="center"
        border={0}
        cellPadding="0"
        cellSpacing="0"
        role="presentation"
        style={{
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "white",
          backgroundImage: "url('/static/my-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 424,
        }}
      >
        <tbody>
          <tr>
            <td align="center" style={{ padding: "40px", textAlign: "center" }}>
              <Heading
                as="h4"
                style={{
                  margin: "8px 0 0 0",
                  fontWeight: 700,
                  color: "rgb(236, 166, 39)",
                }}
              ></Heading>
              <Text
                style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: 16,
                  color: "rgb(45, 24, 83)",
                }}
              >
                Hi there👋 Hope you are excited for today. Here is today's
                workout
              </Text>

              <Heading
                as="h1"
                style={{
                  margin: "8px 0 0 0",
                  fontWeight: 700,
                  fontSize: 28,
                  color: "rgb(45, 24, 83)",
                }}
              >
                This is your moment. Own it. Crush it.
              </Heading>
              <Text
                style={{
                  margin: "16px 0 0 0",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "rgb(45, 24, 83)",
                }}
              >
              </Text>
              <Button
                href="https://react.email "
                style={{
                  display: "inline-block",
                  marginTop: 24,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "rgb(229,231,235)",
                  backgroundColor: "#000",
                  padding: "12px 40px",
                  fontWeight: 600,
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Go To App
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

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
                <Link href="#">
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
    </Html>
  );
};

export default DailyWorkoutsTemplate;
