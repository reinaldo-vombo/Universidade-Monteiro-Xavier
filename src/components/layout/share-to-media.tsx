import React from 'react'
import { XShareButton, XIcon, WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

type TProps = {
   shareUrl: string;
   tags: string[]
   title: string;
}
const ShareToMedia = ({ shareUrl, tags, title }: TProps) => {
   return (
      <div>
         <WhatsappShareButton title={title} url={shareUrl} aria-label="Partilhar no WhatsApp">
            <WhatsappIcon size={32} round />
         </WhatsappShareButton>;
         <XShareButton
            title={title}
            via="reactshare"
            hashtags={tags}
            url={shareUrl}
            aria-label="Partilhar no X"
         >
            <XIcon size={32} round />
         </XShareButton>;
         <FacebookShareButton url={shareUrl} aria-label="Share this page on Facebook">
            <FacebookIcon size={32} round />
         </FacebookShareButton>;
         <LinkedinShareButton
            title={title}
            summary="Quick summary"
            source="example.com"
            url={shareUrl}
            aria-label="Share on LinkedIn"
         >
            <LinkedinIcon size={32} round />
         </LinkedinShareButton>;
      </div>
   )
}

export default ShareToMedia;
