import React from "react";
import { Twitter, Facebook, Mail, Linkedin, Reddit, Whatsapp, Telegram } from 'react-social-sharing'


export default function shareButtons() {
  const shareUrl = "http://tckn.surge.sh/";
  const title = "tckn - Kimlik No Doğrulama / Oluşturma Aracı";
  return (
    <div style={{textAlign: 'center'}}>
      <Twitter solidcircle message={title} link={shareUrl}/>
      <Facebook solid link={shareUrl}/>
      <Mail solid medium subject={title} link={shareUrl}/>
      <Linkedin solid medium message={title} link={shareUrl}/>
      <Reddit solid medium link={shareUrl}/>
      <Whatsapp solid medium message={title} link={shareUrl}/>
      <Telegram solid medium message={title} link={shareUrl}/>
    </div>
  );
}
