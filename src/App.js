import React, { useState } from "react";
import {
  Segment,
  Container,
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";

function App() {
  const [includeUppercaseElement, setUppercaseElement] = useState(false);
  const [includeNumbersElement, setNumbersElement] = useState(false);
  const [includeSymbolsElement, setSymbolsElement] = useState(false);
  const [passwordDisplay, setDisplay] = useState("");

  const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
  const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
  const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
  const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 95));
  const preparePassword = (e) => {
    e.preventDefault();
    const characterAmount = 12;
    const includeUppercase = includeUppercaseElement;
    const includeNumbers = includeNumbersElement;
    const includeSymbols = includeSymbolsElement;
    const password = generatePassword(
      characterAmount,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    setDisplay(password);
  };

  function generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let charCodes = LOWERCASE_CHAR_CODES;
    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for (let i = 0; i < characterAmount; i++) {
      const characterCode =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCode));
    }
    return passwordCharacters.join("");
  }

  function arrayFromLowToHigh(low, high) {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }

  // function syncCharacterAmount(e) {
  //   const value = e.target.value;
  //   characterAmountNumber.value = value;
  //   characterAmountRange.value = value;
  // }
  return (
    <Segment placeholder>
      <Container>
        <Grid style={{ height: "60vh" }} verticalAlign="top">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="black">
              <Icon name="gitkraken" />
              <Header.Content>
                Kraken
                <Header.Subheader>Sail safely</Header.Subheader>
              </Header.Content>
            </Header>
            <Form size="large" style={{ marginTop: "10vh" }}>
              <Segment>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Include uppercase"
                    onClick={() =>
                      setUppercaseElement(!includeUppercaseElement)
                    }
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Include numbers"
                    onClick={() => setNumbersElement(!includeNumbersElement)}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Include symbols"
                    onClick={() => setSymbolsElement(!includeSymbolsElement)}
                  />
                </Form.Field>
                <Button
                  color="black"
                  fluid
                  size="large"
                  onClick={preparePassword}
                >
                  Generate password
                </Button>
              </Segment>
            </Form>
            <Header
              as="h2"
              color="black"
              textAlign="center"
              content={passwordDisplay}
              // style={{ margin: "10vh 0 0 0 " }}
            ></Header>
          </Grid.Column>
        </Grid>
        <Grid style={{ height: "40vh" }} verticalAlign="bottom">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message>
              Interested in collaboration?{" "}
              <a href="https://github.com/tomaszpionka"> Check out my github</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}

export default App;
