import React from "react";
import { Icon, Button, Modal, Label, Popup } from "semantic-ui-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function CustomModal(props) {
  console.log(props);
  return (
    <Modal trigger={<Button secondary>{props.title && props.title}</Button>}>
      <Modal.Header>{props.title} Kod Örneği</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <CopyToClipboard
            text={props.snippet}
            onCopy={() => console.log("Copied")}
          >
            <a>
              <Popup
                content="Kopyalandı"
                on="click"
                trigger={
                  <Label icon="copy" as="a" color="black" attached='top right'>
                    Kopyala
                  </Label>
                }
              />
            </a>
          </CopyToClipboard>

          <SyntaxHighlighter
            language={props.language && props.language}
            style={darcula}
          >
            {props.snippet}
          </SyntaxHighlighter>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
