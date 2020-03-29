import React, { useState, useEffect, useRef } from "react";

import {
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Label,
  Popup,
  Message,
  Button
} from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import GithubCorner from "react-github-corner";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/database";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import "./App.css";
import CustomModal from "./CustomModal";
import javaSnippet from "./snippets/java";
import javascriptSnippet from "./snippets/javascript";
import numberFormat from "./consts/number-formats";
import { validateIdNumber, generateIdNumber } from "./util";
import ShareButtons from './shareButtons'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDOX-fn9QSoM7D9j_bvtV0E3bOnyKg8Bwc",
  authDomain: "tckn-c3ec6.firebaseapp.com",
  databaseURL: "https://tckn-c3ec6.firebaseio.com",
  projectId: "tckn-c3ec6",
  storageBucket: "tckn-c3ec6.appspot.com",
  messagingSenderId: "379808543686",
  appId: "1:379808543686:web:b3df25e1cf9c93c2dbb8c7",
  measurementId: "G-Z4864MCCQE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();

function formatCount(value) {
  const format = numberFormat.find(format => value < format.limit);

  value = (1000 * value) / format.limit;
  value = Math.round(value * 10) / 10;

  return value + format.letter;
}

function App() {
  const [randomIdNumber, setRandomIdNumber] = useState();
  const [idNumberToValidate, setIdNumberToValidate] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [createdIdNumberCount, setCreatedIdNumberCount] = useState();
  const [validateIdNumberCount, setValidateIdNumberCount] = useState();
  const idNumberRef = useRef(null);

  useEffect(() => {
    setRandomIdNumber(generateIdNumber());
    firebase
      .database()
      .ref("count")
      .on("value", snap => {
        console.log("snap val", snap.val().count);
        setCreatedIdNumberCount(snap.val().count);
      });
    firebase
      .database()
      .ref("validateCount")
      .on("value", snap => {
        console.log("snap val - validate", snap.val());
        setValidateIdNumberCount(snap.val());
      });
    return () => {};
  }, []);

  useEffect(() => {
    if (validateIdNumber(idNumberToValidate)) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    return () => {};
  }, [idNumberToValidate]);

  useEffect(() => {
    if (createdIdNumberCount !== undefined) {
      firebase
        .database()
        .ref("count")
        .set({
          count: createdIdNumberCount + 1
        });
    }
    return () => {};
  }, [randomIdNumber]);

  useEffect(() => {
    if (validateIdNumberCount !== undefined && isCorrect) {
      firebase
        .database()
        .ref("validateCount")
        .set(validateIdNumberCount + 1);
    }
    return () => {};
  }, [isCorrect]);

  return (
    <Grid verticalAlign="middle" centered>
      <div
        style={{ backgroundColor: "black", width: "100%", minHeight: "100px" }}
      >
        <Grid.Row>
          <Grid.Column>
            <Grid centered>
              <Grid.Column textAlign="center">
                <h1 style={{ color: "white", marginTop: "25px" }}>tckn</h1>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </div>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <Segment placeholder>
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical>veya</Divider>

              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  <Header
                    color={
                      idNumberToValidate === ""
                        ? "grey"
                        : isCorrect
                        ? "green"
                        : "red"
                    }
                    icon
                  >
                    <Icon
                      color={
                        idNumberToValidate === ""
                          ? "grey"
                          : isCorrect
                          ? "green"
                          : "red"
                      }
                      name="check square outline"
                    />
                    TC Kimlik No Doğrula
                  </Header>

                  <Search
                    placeholder="TC Kimlik No Doğrula..."
                    onSearchChange={item =>
                      setIdNumberToValidate(item.target.value)
                    }
                    value={idNumberToValidate}
                    showNoResults={false}
                  />
                  {validateIdNumberCount && (
                    <Grid.Row textAlign="center">
                      <Grid.Column>
                        <Label basic pointing>
                          <Label.Detail>
                            {validateIdNumberCount &&
                              formatCount(validateIdNumberCount)}
                          </Label.Detail>
                          {" kez kullanıldı"}
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid.Column>

                <Grid.Column>
                  <Grid.Row>
                    <Grid.Column>
                      <Header icon>
                        <Icon name="id card" />
                        TC Kimlik No Oluştur
                      </Header>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <a onClick={() => setRandomIdNumber(generateIdNumber())}>
                        <Icon size="big" name="redo" />
                      </a>
                      <Label size="huge" ref={idNumberRef}>
                        {randomIdNumber && randomIdNumber}
                      </Label>
                      <CopyToClipboard
                        text={randomIdNumber}
                        onCopy={() => console.log("Copied")}
                      >
                        <a>
                          <Popup
                            content="Kopyalandı"
                            on="click"
                            trigger={<Icon size="big" name="copy outline" />}
                          />
                        </a>
                      </CopyToClipboard>
                    </Grid.Column>
                  </Grid.Row>
                  {createdIdNumberCount && (
                    <Grid.Row textAlign="center">
                      <Grid.Column>
                        <Label basic pointing>
                          <Label.Detail>
                            {createdIdNumberCount &&
                              formatCount(createdIdNumberCount)}
                          </Label.Detail>
                          {" kez kullanıldı"}
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid verticalAlign="middle" centered>
        <Grid.Row centered textAlign="center">
          <Grid.Column textAlign="center">
            <Header as="h2">
              <Icon name="code" />
              <Header.Content>
                Kod Snippets
                <Header.Subheader>
                  Farklı dillerde kod örnekleri
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <Button.Group>
            <CustomModal language="java" title="JAVA" snippet={javaSnippet} />
            <CustomModal
              language="javascript"
              title="JavaScript"
              snippet={javascriptSnippet}
            />
          </Button.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column></Grid.Column>
      </Grid.Row>
      <GithubCorner href="https://github.com/burakaykan/tckn" />
      <div style={{ width: "80%", textAlign: "center" }}>
        <Grid.Row verticalAlign="bottom">
          <Grid.Column>
            <Message
              negative
              floating
              icon="question"
              header="Sorumluluk Reddi"
              content="Uyarı: Sadece kütüphaneleri keşfetmek amacıyla deneme olarak yapılmıştır. Yasadışı kullanımlarda, sorumluluk kullanana aittir."
            />
          </Grid.Column>
        </Grid.Row>
      </div>
      <Grid.Row  verticalAlign="bottom">
        <Grid.Column>
          <ShareButtons />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
